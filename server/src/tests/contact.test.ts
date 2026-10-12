import { createApp } from '../app.js';
import { contactSchema } from '../validators/contactValidator.js';
import { EmailService, escapeHtml } from '../services/emailService.js';
import { TurnstileService } from '../services/turnstileService.js';
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
  console.log('🧪 Starting Contact API & Turnstile Test Suite');
  console.log('========================================\n');

  // ----------------------------------------------------
  // Test Suite 1: Input Validation & Schema Tests
  // ----------------------------------------------------
  console.log('1. Zod Input Validation & Schema Tests:');

  const validPayload = {
    name: 'Dr. Alex Mercer',
    email: 'alex.mercer@organization.com',
    scope: 'fullstack' as const,
    message: 'We want to architect a distributed telemetry dashboard for real-time edge sensors.',
    nda: true,
    turnstileToken: '0.valid_cf_mock_token_for_automated_testing_12345',
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

  // Turnstile schema validation tests
  const { turnstileToken: _, ...withoutToken } = validPayload;
  const missingTokenResult = contactSchema.safeParse(withoutToken);
  assert(!missingTokenResult.success, 'Missing turnstileToken is rejected by schema');
  if (!missingTokenResult.success) {
    assert(missingTokenResult.error.issues.some((i) => i.path[0] === 'turnstileToken'), 'Rejection contains field error for "turnstileToken"');
  }

  const emptyTokenResult = contactSchema.safeParse({ ...validPayload, turnstileToken: '   ' });
  assert(!emptyTokenResult.success, 'Empty whitespace turnstileToken is rejected');

  const oversizedTokenResult = contactSchema.safeParse({ ...validPayload, turnstileToken: 't'.repeat(2049) });
  assert(!oversizedTokenResult.success, 'Oversized turnstileToken (>2048 chars) is rejected');

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
  // Test Suite 3: Express Integration & Cloudflare Turnstile Verification
  // ----------------------------------------------------
  console.log('\n3. Express Integration & Cloudflare Turnstile Verification:');

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

    // 3b: POST /api/contact with invalid basic fields returns 400
    const invalidPostRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'invalid-email', scope: 'unknown' }),
    });
    const invalidPostJson = await invalidPostRes.json();
    assert(invalidPostRes.status === 400, 'POST /api/contact with invalid data returns HTTP 400');
    assert(Boolean(invalidPostJson.errors?.name && invalidPostJson.errors?.email), 'Response includes field-specific validation errors');

    // 3c: Missing Turnstile token returns 400 and does NOT trigger email sending
    EmailService.resetSendCallCount();
    const missingTokenRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(withoutToken),
    });
    const missingTokenJson = await missingTokenRes.json();
    assert(missingTokenRes.status === 400, 'Missing Turnstile token returns HTTP 400');
    assert(Boolean(missingTokenJson.errors?.turnstileToken), 'Response specifies turnstileToken is required');
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when Turnstile token is missing');

    // 3d: Mock Turnstile failure - Invalid token rejected by Cloudflare
    EmailService.resetSendCallCount();
    TurnstileService.setMockVerifier(async (token) => {
      assert(token === 'invalid-token-test', 'TurnstileService received expected test token');
      return {
        success: false,
        error: 'Security verification challenge response is invalid.',
        errorCodes: ['invalid-input-response'],
      };
    });

    const invalidTokenRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validPayload,
        turnstileToken: 'invalid-token-test',
      }),
    });
    const invalidTokenJson = await invalidTokenRes.json();
    assert(invalidTokenRes.status === 400, 'Invalid Turnstile token returns HTTP 400');
    assert(Boolean(invalidTokenJson.errors?.turnstileToken), 'Response contains field error for turnstileToken failure');
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when Turnstile token is invalid');

    // 3e: Mock Turnstile expired or duplicate token (timeout-or-duplicate)
    EmailService.resetSendCallCount();
    TurnstileService.setMockVerifier(async () => {
      return {
        success: false,
        error: 'Verification token has expired or was already used. Please complete a new challenge.',
        errorCodes: ['timeout-or-duplicate'],
      };
    });

    const expiredTokenRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...validPayload,
        turnstileToken: 'expired-or-duplicate-token',
      }),
    });
    const expiredTokenJson = await expiredTokenRes.json();
    assert(expiredTokenRes.status === 400, 'Expired/duplicate Turnstile token returns HTTP 400');
    assert(
      expiredTokenJson.errors?.turnstileToken?.[0]?.includes('expired or was already used'),
      'Response explains expired or duplicate token clearly'
    );
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when Turnstile token is expired/duplicate');

    // 3f: Mock Cloudflare Siteverify Gateway Failure (HTTP 502)
    EmailService.resetSendCallCount();
    TurnstileService.setMockVerifier(async () => {
      return {
        success: false,
        isGatewayError: true,
        error: 'Network error connecting to security verification service.',
      };
    });

    const gatewayErrRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    assert(gatewayErrRes.status === 502, 'Turnstile gateway communication error returns HTTP 502');
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when Turnstile verification gateway fails');

    // 3g: Unconfigured Turnstile Secret Key (HTTP 503)
    EmailService.resetSendCallCount();
    TurnstileService.setMockUnconfigured(true);
    const unconfiguredRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const unconfiguredJson = await unconfiguredRes.json();
    assert(unconfiguredRes.status === 503, 'Unconfigured Turnstile service returns HTTP 503');
    assert(
      unconfiguredJson.message.includes('unconfigured') || unconfiguredJson.message.includes('azizsaddiquesaddique@gmail.com'),
      'HTTP 503 provides direct email contact fallback instructions'
    );
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when Turnstile service is unconfigured');
    TurnstileService.setMockUnconfigured(false);

    // 3h: Honeypot suppression (valid Turnstile token present, honeypot triggered)
    EmailService.resetSendCallCount();
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
    assert(EmailService.getSendCallCount() === 0, 'No email is sent when honeypot trap is triggered');

    // 3i: Valid Turnstile verification proceeds to email delivery
    EmailService.resetSendCallCount();
    TurnstileService.setMockVerifier(async (token) => {
      assert(token === validPayload.turnstileToken, 'Verified token matches payload');
      return {
        success: true,
        hostname: 'azizsaddique.dev',
        challengeTs: new Date().toISOString(),
      };
    });

    // Provide mock email sender to prevent external Resend API call in CI/test
    EmailService.setMockSender(async (data) => {
      assert(data.name === validPayload.name, 'EmailService received verified data');
      return {
        success: true,
        messageId: 'mock-resend-msg-id-12345',
      };
    });

    const realContactRes = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validPayload),
    });
    const realContactJson = await realContactRes.json();
    assert(realContactRes.status === 200, 'Valid token and payload returns HTTP 200');
    assert(realContactJson.status === 'ok', 'Response status is ok');
    assert(EmailService.getSendCallCount() === 1, 'EmailService was dispatched exactly once after Turnstile passed');

    // 3j: Rate limiter headers are configured and return expected limits
    const rateLimitHeader = realContactRes.headers.get('ratelimit-limit');
    assert(Boolean(rateLimitHeader), 'Rate limit headers (RateLimit-Limit) are included in responses');
    assert(rateLimitHeader === '60', 'Development/test environment applies relaxed rate limit threshold (60 req)');

    // Clean up test mocks
    TurnstileService.resetMock();
    EmailService.setMockSender(null);
  } finally {
    server.close();
  }

  console.log('\n========================================');
  console.log(`📊 Contact Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
