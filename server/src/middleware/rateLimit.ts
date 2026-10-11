import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const isProduction = env.NODE_ENV === 'production';

// Global rate limiter for all incoming requests (100 req / 15 min in prod, 1000 in dev)
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

// Stricter rate limiter specifically for contact form submissions:
// - Production: strictly 5 requests per 15 minutes to prevent spam & protect Resend quotas.
// - Development / Test: relaxed to 60 requests per 15 minutes (configurable via DEV_CONTACT_RATE_LIMIT) to allow active testing without connection lockout.
const devContactMax = process.env.DEV_CONTACT_RATE_LIMIT
  ? parseInt(process.env.DEV_CONTACT_RATE_LIMIT, 10) || 60
  : 60;

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 5 : devContactMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many contact submissions from this IP. Please wait 15 minutes before submitting another inquiry.',
  },
});

// Dedicated rate limiter specifically for AI chat assistant requests:
// - Production: strictly 15 requests per 15 minutes to protect Gemini quotas & compute.
// - Development / Test: relaxed to 60 requests per 15 minutes (configurable via DEV_CHAT_RATE_LIMIT) for comfortable local interaction.
const devChatMax = process.env.DEV_CHAT_RATE_LIMIT
  ? parseInt(process.env.DEV_CHAT_RATE_LIMIT, 10) || 60
  : 60;

export const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 15 : devChatMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many chat requests from this IP. Please wait 15 minutes before submitting another query.',
  },
});


