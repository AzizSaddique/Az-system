import express, { Express } from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middleware/cors.js';
import { globalRateLimiter, contactRateLimiter, chatRateLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';
import { contactRouter } from './routes/contact.js';
import { chatRouter } from './routes/chat.js';

export const createApp = (): Express => {
  const app = express();

  // 1. Security Headers
  app.use(helmet());

  // 2. Cross-Origin Resource Sharing
  app.use(corsMiddleware);

  // 3. Global Rate Limiter
  app.use(globalRateLimiter);

  // 4. Body Parser with 10 KB limit
  app.use(express.json({ limit: '10kb' }));

  // 5. API Routes
  app.use('/api/health', healthRouter);
  app.use('/api/contact', contactRateLimiter, contactRouter);
  app.use('/api/chat', chatRateLimiter, chatRouter);

  // 6. 404 Handler for Unmatched Routes
  app.use(notFoundHandler);

  // 7. Centralized Error Handler
  app.use(errorHandler);

  return app;
};

// Instantiate default app instance for Vercel Express runtime entrypoint
const app = createApp();

export default app;

