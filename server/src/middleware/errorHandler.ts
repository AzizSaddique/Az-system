import { Request, Response, NextFunction } from 'express';

// 404 Not Found Middleware
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

// Centralized Error Handling Middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // Safe server-side error logging
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err?.message || err);

  // Handle specific HTTP errors safely
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({
      status: 'error',
      message: 'Payload size exceeds the 10 KB limit',
    });
  }

  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      message: 'Malformed JSON payload received',
    });
  }

  if (err?.message && err.message.includes('CORS')) {
    return res.status(403).json({
      status: 'error',
      message: err.message,
    });
  }

  const statusCode = typeof err?.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 600
    ? err.statusCode
    : typeof err?.status === 'number' && err.status >= 400 && err.status < 600
    ? err.status
    : 500;

  // Never leak internal stack traces or database errors to client
  const clientMessage = statusCode >= 500
    ? 'Internal server error'
    : (err?.message || 'An unexpected error occurred');

  return res.status(statusCode).json({
    status: 'error',
    message: clientMessage,
  });
};
