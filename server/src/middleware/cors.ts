import cors from 'cors';
import { env } from '../config/env.js';

// Always allow the production domain as a built-in default
export const DEFAULT_PRODUCTION_ORIGIN = 'https://frontend-bay-chi-32.vercel.app';

// Allow Vercel preview deployments for this project
export const VERCEL_PREVIEW_REGEX = /^https:\/\/frontend-[a-z0-9-]+-azizs-projects-5ec766b4\.vercel\.app$/;

// Parse comma-separated list of origins (trim spaces, strip trailing slashes)
const parseOrigins = (raw: string): string[] => {
  return raw
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
};

const rawConfiguredOrigins = process.env.FRONTEND_URL || env.CLIENT_URL || '';
const configuredOrigins = parseOrigins(rawConfiguredOrigins);

// Comprehensive list of allowed static origins
export const allowedOrigins = Array.from(
  new Set([
    DEFAULT_PRODUCTION_ORIGIN,
    'http://localhost:3000',
    ...configuredOrigins,
  ])
);

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, health checks)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.trim().replace(/\/$/, '');

    if (
      allowedOrigins.includes(normalizedOrigin) ||
      allowedOrigins.includes('*') ||
      VERCEL_PREVIEW_REGEX.test(normalizedOrigin)
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin '${origin}' not allowed by CORS policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
});
