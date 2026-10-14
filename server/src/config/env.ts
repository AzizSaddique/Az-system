import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load environment variables reliably regardless of CWD or runtime environment
// In local dev, loads from server/.env or root .env; in Vercel, process.env is injected by platform
try {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
} catch {
  // Graceful fallback if __dirname is not available
}
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config();

const cleanString = (raw: string | undefined): string => {
  if (!raw) return '';
  let cleaned = raw.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
};

const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === '') return 5000;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 5000 : parsed;
    })
    .refine((val) => val > 0 && val < 65536, {
      message: 'PORT must be a valid port number between 1 and 65535',
    }),
  NODE_ENV: z
    .string()
    .optional()
    .transform((val) => {
      if (val === 'production' || val === 'test') return val;
      return 'development';
    }),
  CLIENT_URL: z
    .string()
    .optional()
    .transform((val) => {
      const candidate = process.env.FRONTEND_URL || val;
      return candidate && candidate.trim() !== '' ? candidate : 'http://localhost:3000';
    }),
  RESEND_API_KEY: z
    .string()
    .optional()
    .default(''),
  CONTACT_TO_EMAIL: z
    .string()
    .optional()
    .transform((val) => (val && val.trim() !== '' ? val : 'azizsaddiquesaddique@gmail.com'))
    .pipe(z.string().email()),
  CONTACT_FROM_EMAIL: z
    .string()
    .optional()
    .default('Portfolio Contact <onboarding@resend.dev>'),
  GEMINI_API_KEY: z
    .string()
    .optional()
    .transform(() => {
      const candidate =
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_API_KEY ||
        process.env.GOOGLE_GENAI_API_KEY ||
        '';
      return cleanString(candidate);
    }),
  GEMINI_MODEL: z
    .string()
    .optional()
    .transform((val) => {
      const candidate = cleanString(process.env.GEMINI_MODEL || val);
      return candidate || 'gemini-3.5-flash-lite';
    }),
  TURNSTILE_SECRET_KEY: z
    .string()
    .optional()
    .default(''),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
