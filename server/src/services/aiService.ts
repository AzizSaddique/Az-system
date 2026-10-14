import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';
import { PORTFOLIO_SYSTEM_INSTRUCTION } from './aiKnowledge.js';
import { ChatMessage } from '../validators/chatValidator.js';

export class AiServiceError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'AiServiceError';
    this.statusCode = statusCode;
  }
}

export interface AiClientInterface {
  models: {
    generateContent: (params: {
      model: string;
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
      config?: {
        systemInstruction?: string;
        maxOutputTokens?: number;
        temperature?: number;
      };
    }) => Promise<{
      text?: string | null;
      candidates?: Array<{
        finishReason?: string;
      }>;
    }>;
  };
}

export class AiService {
  private client: AiClientInterface | null = null;
  private mockUnconfigured = false;

  constructor(customClient?: AiClientInterface) {
    if (customClient) {
      this.client = customClient;
    }
  }

  /**
   * Set a custom or mock AI client (primarily for testing without live API keys).
   */
  public setClient(customClient: AiClientInterface | null): void {
    this.client = customClient;
  }

  /**
   * Force unconfigured state for testing, independent of environment variables.
   */
  public setMockUnconfigured(unconfigured: boolean): void {
    this.mockUnconfigured = unconfigured;
  }

  /**
   * Checks whether the AI service is ready to handle requests.
   */
  public isConfigured(): boolean {
    if (this.mockUnconfigured) return false;
    if (this.client) return true;
    return Boolean(env.GEMINI_API_KEY && env.GEMINI_API_KEY.trim().length > 0);
  }

  /**
   * Returns the initialized Gemini client.
   */
  private getClient(): AiClientInterface {
    if (this.client) {
      return this.client;
    }

    const apiKey = env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      throw new AiServiceError(
        'AI Portfolio Assistant service is currently unconfigured or unavailable. Please reach out directly via the contact form or email.',
        503
      );
    }

    this.client = new GoogleGenAI({ apiKey }) as unknown as AiClientInterface;
    return this.client;
  }

  /**
   * Generates a grounded response to a user prompt using conversation history.
   */
  public async generateReply(message: string, history: ChatMessage[] = []): Promise<string> {
    if (!this.isConfigured()) {
      throw new AiServiceError(
        'AI Portfolio Assistant service is currently unconfigured or unavailable. Please reach out directly via the contact form or email.',
        503
      );
    }

    const client = this.getClient();
    const model = env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

    // Construct conversation payload.
    // Client-provided history is treated strictly as untrusted dialogue turns.
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    for (const item of history) {
      contents.push({
        role: item.role === 'model' ? 'model' : 'user',
        parts: [{ text: item.text }],
      });
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const startTime = Date.now();

    try {
      const response = await client.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
          maxOutputTokens: 2048,
          temperature: 0.3,
        },
      });

      const finishReason = response.candidates?.[0]?.finishReason;
      if (finishReason === 'MAX_TOKENS') {
        console.error('[AiService] Response truncated: finishReason was MAX_TOKENS');
      }

      const replyText = response.text?.trim();

      if (!replyText) {
        throw new AiServiceError('The AI model generated an empty response. Please try asking again.', 502);
      }

      const durationMs = Date.now() - startTime;
      console.log(`[AiService] Successfully generated reply in ${durationMs}ms (model: ${model})`);

      return replyText;
    } catch (err: unknown) {
      if (err instanceof AiServiceError) {
        throw err;
      }

      const errorMsg = err instanceof Error ? err.message : String(err);
      // Log the real underlying error reason
      console.error(`[AiService] Gemini API failure: ${errorMsg}`);

      // Return 502 for Gemini API failures (invalid key, quota, model not found, etc.)
      throw new AiServiceError(
        'The AI service is temporarily unavailable due to an upstream provider issue. Please try again later or use the contact form.',
        502
      );
    }

  }
}

export const aiService = new AiService();
