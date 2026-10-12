import { env } from '../config/env.js';

export interface TurnstileVerifyResult {
  success: boolean;
  error?: string;
  errorCodes?: string[];
  hostname?: string;
  challengeTs?: string;
  isUnconfigured?: boolean;
  isGatewayError?: boolean;
}

export type TurnstileVerifyFn = (
  token: string,
  remoteIp?: string
) => Promise<TurnstileVerifyResult>;

export class TurnstileService {
  private static readonly VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  // Test hooks for mocking in automated test suites
  private static mockVerifier: TurnstileVerifyFn | null = null;
  private static mockUnconfigured: boolean = false;

  public static setMockVerifier(verifier: TurnstileVerifyFn | null): void {
    this.mockVerifier = verifier;
  }

  public static setMockUnconfigured(unconfigured: boolean): void {
    this.mockUnconfigured = unconfigured;
  }

  public static resetMock(): void {
    this.mockVerifier = null;
    this.mockUnconfigured = false;
  }

  /**
   * Verifies a Cloudflare Turnstile response token with Cloudflare's Siteverify API.
   *
   * @param token The turnstile token string passed from the client widget
   * @param remoteIp Optional IP address of the client submitting the challenge
   */
  public static async verifyToken(
    token: string,
    remoteIp?: string
  ): Promise<TurnstileVerifyResult> {
    // 1. Check for mock overrides (in automated tests)
    if (this.mockUnconfigured) {
      return {
        success: false,
        isUnconfigured: true,
        error: 'Security verification service is unconfigured.',
      };
    }

    if (this.mockVerifier) {
      return await this.mockVerifier(token, remoteIp);
    }

    // 2. Validate configuration
    const secretKey = env.TURNSTILE_SECRET_KEY?.trim();

    if (!secretKey || secretKey === 'your_turnstile_secret_key_here') {
      console.warn('[TurnstileService] TURNSTILE_SECRET_KEY is not configured in server environment.');
      return {
        success: false,
        isUnconfigured: true,
        error: 'Security verification service is not configured on this server.',
      };
    }

    // 3. Request verification from Cloudflare Siteverify endpoint
    try {
      const formParams = new URLSearchParams();
      formParams.append('secret', secretKey);
      formParams.append('response', token);
      if (remoteIp) {
        formParams.append('remoteip', remoteIp);
      }

      const response = await fetch(this.VERIFY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formParams.toString(),
      });

      if (!response.ok) {
        console.error(`[TurnstileService] Cloudflare Siteverify HTTP error: ${response.status} ${response.statusText}`);
        return {
          success: false,
          isGatewayError: true,
          error: 'Cloudflare security verification gateway returned an unexpected status code.',
        };
      }

      const data = (await response.json()) as {
        success: boolean;
        'error-codes'?: string[];
        challenge_ts?: string;
        hostname?: string;
        action?: string;
        cdata?: string;
      };

      if (!data.success) {
        const errorCodes = data['error-codes'] || [];
        console.warn('[TurnstileService] Cloudflare rejected verification token:', errorCodes);

        let userError = 'Security verification failed. Please complete the challenge again.';
        if (errorCodes.includes('timeout-or-duplicate')) {
          userError = 'Verification token has expired or was already used. Please complete a new challenge.';
        } else if (errorCodes.includes('invalid-input-response')) {
          userError = 'Verification challenge response is invalid. Please refresh the challenge.';
        } else if (errorCodes.includes('missing-input-response')) {
          userError = 'Verification response token was not provided.';
        }

        return {
          success: false,
          error: userError,
          errorCodes,
        };
      }

      return {
        success: true,
        hostname: data.hostname,
        challengeTs: data.challenge_ts,
      };
    } catch (err: any) {
      console.error('[TurnstileService] Network error during Cloudflare verification:', err?.message || err);
      return {
        success: false,
        isGatewayError: true,
        error: 'Network error connecting to security verification service.',
      };
    }
  }
}
