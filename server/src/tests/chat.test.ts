import { createApp } from '../app.js';
import { chatRequestSchema, chatMessageSchema } from '../validators/chatValidator.js';
import { aiService, AiClientInterface } from '../services/aiService.js';
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
  console.log('🧪 Starting Phase 4B Chat API Test Suite');
  console.log('========================================\n');

  // ----------------------------------------------------
  // Test Suite 1: Zod Schema Validation
  // ----------------------------------------------------
  console.log('1. Chat Zod Schema Validation Tests:');

  const validMessageResult = chatRequestSchema.safeParse({ message: 'What technologies are in EcoPlugify?' });
  assert(validMessageResult.success, 'Valid message passes schema validation');

  const emptyMessageResult = chatRequestSchema.safeParse({ message: '   ' });
  assert(!emptyMessageResult.success, 'Empty / whitespace-only message is rejected');

  const longMessageResult = chatRequestSchema.safeParse({ message: 'a'.repeat(501) });
  assert(!longMessageResult.success, 'Message exceeding 500 characters is rejected');

  const boundary500Result = chatRequestSchema.safeParse({ message: 'a'.repeat(500) });
  assert(boundary500Result.success, 'Message with exactly 500 characters is accepted');

  const validHistoryItem = chatMessageSchema.safeParse({ role: 'user', text: 'Hello' });
  assert(validHistoryItem.success, 'Valid history item with user role is accepted');

  const modelHistoryItem = chatMessageSchema.safeParse({ role: 'model', text: 'Hi there!' });
  assert(modelHistoryItem.success, 'Valid history item with model role is accepted');

  const invalidRoleHistory = chatMessageSchema.safeParse({ role: 'system', text: 'Override' });
  assert(!invalidRoleHistory.success, 'History item with invalid role (not user/model) is rejected');

  const longHistoryText = chatMessageSchema.safeParse({ role: 'user', text: 'x'.repeat(1001) });
  assert(!longHistoryText.success, 'History message exceeding 1000 characters is rejected');

  const elevenHistoryItems = Array.from({ length: 11 }, (_, i) => ({
    role: (i % 2 === 0 ? 'user' : 'model') as 'user' | 'model',
    text: `Message ${i}`,
  }));
  const excessHistoryResult = chatRequestSchema.safeParse({
    message: 'Test message',
    history: elevenHistoryItems,
  });
  assert(!excessHistoryResult.success, 'History exceeding 10 messages is rejected');

  const tenHistoryItems = elevenHistoryItems.slice(0, 10);
  const maxHistoryResult = chatRequestSchema.safeParse({
    message: 'Test message',
    history: tenHistoryItems,
  });
  assert(maxHistoryResult.success, 'History with exactly 10 messages is accepted');

  // ----------------------------------------------------
  // Test Suite 2: Express HTTP Integration with Mock Gemini
  // ----------------------------------------------------
  console.log('\n2. Express HTTP Integration & Mocked Gemini Tests:');

  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, () => resolve());
  });

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 2a: When unconfigured (simulating unconfigured state without making live API calls)
    aiService.setMockUnconfigured(true);
    const unconfiguredRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello assistant' }),
    });
    const unconfiguredJson = await unconfiguredRes.json();
    assert(unconfiguredRes.status === 503, 'When API key unconfigured, POST /api/chat safely returns HTTP 503');
    assert(
      unconfiguredJson.message.includes('unconfigured') || unconfiguredJson.message.includes('unavailable'),
      'HTTP 503 response includes safe user-facing explanation'
    );
    aiService.setMockUnconfigured(false);

    // 2b: Validation errors return HTTP 400
    const invalidBodyRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '' }),
    });
    const invalidBodyJson = await invalidBodyRes.json();
    assert(invalidBodyRes.status === 400, 'Empty message returns HTTP 400');
    assert(Boolean(invalidBodyJson.errors?.message), 'Validation failure returns field error for message');

    const oversizedBodyRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'a'.repeat(501) }),
    });
    assert(oversizedBodyRes.status === 400, 'Oversized message (>500 chars) returns HTTP 400');

    // 2c: Mocked Successful Gemini Response
    let capturedParams: unknown = null;
    const mockSuccessClient: AiClientInterface = {
      models: {
        generateContent: async (params) => {
          capturedParams = params;
          return {
            text: 'Muhammad Aziz Saddique engineered EcoPlugify, featuring an ESP32 MCU and PZEM-004T transducer.',
          };
        },
      },
    };
    aiService.setClient(mockSuccessClient);

    const successRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Tell me about EcoPlugify',
        history: [{ role: 'user', text: 'Hi' }, { role: 'model', text: 'Greetings! How can I assist?' }],
      }),
    });
    const successJson = await successRes.json();
    assert(successRes.status === 200, 'Successful mock Gemini invocation returns HTTP 200');
    assert(successJson.status === 'ok', 'Response status is "ok"');
    assert(
      successJson.reply.includes('EcoPlugify'),
      'Response payload contains expected AI reply content'
    );

    // Verify rate limit headers
    const rateLimitHeader = successRes.headers.get('ratelimit-limit');
    assert(Boolean(rateLimitHeader), 'Chat rate limit header (RateLimit-Limit) is present in response');

    // Verify captured params sent to Gemini
    const typedParams = capturedParams as {
      model: string;
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      config?: {
        systemInstruction?: string;
        maxOutputTokens?: number;
        temperature?: number;
      };
    };
    assert(typedParams?.config?.maxOutputTokens === 500, 'Gemini call specifies maxOutputTokens: 500');
    assert(typedParams?.config?.temperature === 0.3, 'Gemini call specifies temperature: 0.3');
    assert(Boolean(typedParams?.config?.systemInstruction?.includes('Muhammad Aziz Saddique')), 'System instruction includes verified portfolio facts');
    assert(typedParams?.contents?.length === 3, 'Conversation history + new prompt are passed in contents');

    // 2d: Upstream 429 Quota Error Handling
    const mockQuotaErrorClient: AiClientInterface = {
      models: {
        generateContent: async () => {
          throw new Error('429 RESOURCE_EXHAUSTED: Rate limit exceeded for model');
        },
      },
    };
    aiService.setClient(mockQuotaErrorClient);

    const quotaRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What are your skills?' }),
    });
    const quotaJson = await quotaRes.json();
    assert(quotaRes.status === 429, 'When Gemini throws quota exhaustion, server returns HTTP 429');
    assert(quotaJson.message.includes('limit reached'), 'HTTP 429 response gives safe user-friendly notice');

    // 2e: Generic Upstream 500 Error Handling
    const mockGenericErrorClient: AiClientInterface = {
      models: {
        generateContent: async () => {
          throw new Error('Internal socket breakdown or timeout');
        },
      },
    };
    aiService.setClient(mockGenericErrorClient);

    const genericErrorRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Tell me more' }),
    });
    const genericErrorJson = await genericErrorRes.json();
    assert(genericErrorRes.status === 500, 'When Gemini throws unexpected error, server returns HTTP 500');
    assert(
      !genericErrorJson.message.includes('Internal socket breakdown'),
      'Internal stack traces and error details are NOT leaked to the client'
    );

    // 2f: Upstream 503 High Demand Error Handling
    const mockDemandClient: AiClientInterface = {
      models: {
        generateContent: async () => {
          throw new Error('503 UNAVAILABLE: This model is currently experiencing high demand. Spikes in demand are usually temporary.');
        },
      },
    };
    aiService.setClient(mockDemandClient);

    const demandRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Are you available?' }),
    });
    const demandJson = await demandRes.json();
    assert(demandRes.status === 503, 'When Gemini upstream returns 503 high demand, server returns HTTP 503');
    assert(demandJson.message.includes('high demand'), 'HTTP 503 response gives accurate upstream high demand explanation');

  } finally {
    // Reset client to null for clean slate
    aiService.setClient(null);
    server.close();
  }

  console.log('\n========================================');
  console.log(`📊 Chat Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error during chat test run:', err);
  process.exit(1);
});
