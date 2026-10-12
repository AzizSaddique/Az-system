import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { z } from 'zod';

// Load environment variables reliably from server/.env regardless of CWD
const envPath = fileURLToPath(new URL('../../.env', import.meta.url));
dotenv.config({ path: envPath });
dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .default('5000')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
      message: 'PORT must be a valid port number between 1 and 65535',
    }),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  CLIENT_URL: z
    .string()
    .default('http://localhost:3000'),
  RESEND_API_KEY: z
    .string()
    .optional()
    .default(''),
  CONTACT_TO_EMAIL: z
    .string()
    .email()
    .optional()
    .default('azizsaddiquesaddique@gmail.com'),
  CONTACT_FROM_EMAIL: z
    .string()
    .optional()
    .default('Portfolio Contact <onboarding@resend.dev>'),
  GEMINI_API_KEY: z
    .string()
    .optional()
    .default(''),
  GEMINI_MODEL: z
    .string()
    .optional()
    .default('models/gemini-3.5-flash'),
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
