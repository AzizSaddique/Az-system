import app, { createApp } from './app.js';
import { env } from './config/env.js';
import { allowedOrigins } from './middleware/cors.js';


// Start standalone HTTP server when executed directly (Render / local dev)
const port = Number(process.env.PORT) || 3000;

if (!process.env.VERCEL) {
  const server = app.listen(port, () => {
    console.log('----------------------------------------------------');
    console.log(`🚀 Portfolio Backend running in [${env.NODE_ENV}] mode`);
    console.log(`📡 Server URL:    http://localhost:${port}`);
    console.log(`🩺 Health check:  http://localhost:${port}/api/health`);
    console.log(`🔒 Allowed CORS:  ${allowedOrigins.join(', ')} (+ Vercel preview regex)`);
    console.log('----------------------------------------------------');
  });

  // Graceful shutdown handling
  const handleShutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Gracefully terminating server...`);
    server.close(() => {
      console.log('HTTP server closed cleanly.');
      process.exit(0);
    });

    // Force close if graceful shutdown takes too long
    setTimeout(() => {
      console.error('Forcefully terminating process after timeout.');
      process.exit(1);
    }, 5000).unref();
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}
export { createApp };
export default app;

