import cors from 'cors';
import { env } from '../config/env.js';

// Parse allowed origins from comma-separated list or single string
const allowedOrigins = env.CLIENT_URL.split(',').map((origin) => origin.trim());

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes('*') ||
      (Boolean(process.env.VERCEL) && origin.endsWith('.vercel.app'))
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin '${origin}' not allowed by CORS policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
