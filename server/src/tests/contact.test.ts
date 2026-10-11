import { createApp } from '../app.js';
import { contactSchema } from '../validators/contactValidator.js';
import { EmailService, escapeHtml } from '../services/emailService.js';
import http from 'http';

let passed = 0;
let failed = 0;

const assert = (condition: boolean, testName: string) => {
  if (condition) {
    console.log(`  ✓ ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
};

async function runTests() {
  console.log('\n========================================');
  console.log('🧪 Starting Phase 2 Contact API Test Suite');
  console.log('========================================\n');

  // ----------------------------------------------------
  // Test Suite 1: Input Validation & Sanitization
  // ----------------------------------------------------
  console.log('1. Zod Input Validation & Schema Tests:');

  const validPayload = {
    name: 'Dr. Alex Mercer',
    email: 'alex.mercer@organization.com',
    scope: 'fullstack' as const,
    message: 'We want to architect a distributed telemetry dashboard for real-time edge sensors.',
    nda: true,
  };

  const validResult = contactSchema.safeParse(validPayload);
  assert(validResult.success, 'Valid contact payload passes schema validation');

  const missingNameResult = contactSchema.safeParse({ ...validPayload, name: '' });
  assert(!missingNameResult.success, 'Empty name is rejected');
  if (!missingNameResult.success) {
    assert(missingNameResult.error.issues.some((i) => i.path[0] === 'name'), 'Rejection contains field error for "name"');
  }

  const invalidEmailResult = contactSchema.safeParse({ ...validPayload, email: 'not-an-email' });
  assert(!invalidEmailResult.success, 'Invalid email format is rejected');
  if (!invalidEmailResult.success) {
    assert(invalidEmailResult.error.issues.some((i) => i.path[0] === 'email'), 'Rejection contains field error for "email"');
  }

  const invalidScopeResult = contactSchema.safeParse({ ...validPayload, scope: 'invalid_scope' });
  assert(!invalidScopeResult.success, 'Non-existent project scope is rejected');

  const longMessageResult = contactSchema.safeParse({ ...validPayload, message: 'a'.repeat(801) });
  assert(!longMessageResult.success, 'Message exceeding 800 characters is rejected');

  const boundary800Result = contactSchema.safeParse({ ...validPayload, message: 'a'.repeat(800) });
  assert(boundary800Result.success, 'Message with exactly 800 characters is accepted');

  const emptyMessageResult = contactSchema.safeParse({ ...validPayload, message: '   ' });
  assert(!emptyMessageResult.success, 'Whitespace-only message is rejected');

  // ----------------------------------------------------
  // Test Suite 2: HTML Escaping & Template Safety
  // ----------------------------------------------------
  console.log('\n2. HTML Sanitization & Email Templates:');

  const maliciousString = '<script>alert("xss")</script> & "quote" \'apostrophe\' > <';
  const escaped = escapeHtml(maliciousString);
  assert(!escaped.includes('<script>'), 'HTML script tags are sanitized');
  assert(escaped.includes('&lt;script&gt;'), 'HTML special characters converted to safe entities');

  const timestamp = new Date().toISOString();
  const plainText = EmailService.generatePlainText(validPayload, timestamp);
  assert(plainText.includes('Dr. Alex Mercer'), 'Plain-text email contains sender name');
  assert(plainText.includes('alex.mercer@organization.com'), 'Plain-text email contains sender email');
  assert(plainText.includes('YES (Confidential initiative'), 'Plain-text email shows NDA status');

  const htmlText = EmailService.generateHtml(validPayload, timestamp);
  assert(htmlText.includes('Dr. Alex Mercer'), 'HTML email contains sender name');
  assert(htmlText.includes('alex.mercer@organization.com'), 'HTML email contains sender email');
  assert(htmlText.includes('YES - NDA PREFERRED'), 'HTML email includes NDA badge');

  // ----------------------------------------------------
  // Test Suite 3: Integration with Express Server
  // ----------------------------------------------------
  console.log('\n3. Express Integration & HTTP Endpoints:');

  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, () => resolve());
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 3a: Health check check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200 && healthJson.status === 'ok', 'GET /api/health returns HTTP 200 with status ok');

    // 3b: POST /api/contact with invalid data returns 400 with field errors
    const invalidPostRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'invalid-email', scope: 'unknown' }),
    });
    const invalidPostJson = await invalidPostRes.json();
    assert(invalidPostRes.status === 400, 'POST /api/contact with invalid data returns HTTP 400');
    assert(Boolean(invalidPostJson.errors?.name && invalidPostJson.errors?.email), 'Response includes field-specific validation errors');

    // 3c: Honeypot suppression
    const honeypotRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validPayload,
        _honeypot: 'Automated spam bot fill',
      }),
    });
    const honeypotJson = await honeypotRes.json();
    assert(honeypotRes.status === 200, 'Honeypot submission returns HTTP 200 without crashing');
    assert(honeypotJson.status === 'ok', 'Honeypot submission returns success to deceive bots');

    // 3d: Missing Resend key handling
    // When RESEND_API_KEY is not set (local dev placeholder), returns 503 with safe message
    const realContactRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const realContactJson = await realContactRes.json();
    if (process.env.RESEND_API_KEY) {
      assert(realContactRes.status === 200 || realContactRes.status === 502, 'When API key configured, handles provider response cleanly');
    } else {
      assert(realContactRes.status === 503, 'When API key unconfigured, safely returns HTTP 503');
      assert(realContactJson.message.includes('azizsaddiquesaddique@gmail.com'), 'Safe fallback instructions provided without leaking internal errors');
    }

    // 3e: Rate limiter headers are configured and return expected limits
    const rateLimitHeader = realContactRes.headers.get('ratelimit-limit');
    assert(Boolean(rateLimitHeader), 'Rate limit headers (RateLimit-Limit) are included in responses');
    assert(rateLimitHeader === '60', 'Development/test environment applies relaxed rate limit threshold (60 req)');
  } finally {
    server.close();
  }

  console.log('\n========================================');
  console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
