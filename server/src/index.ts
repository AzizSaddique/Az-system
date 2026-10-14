import app, { createApp } from './app.js';
import { env } from './config/env.js';


// Start standalone HTTP server when executed directly (local dev / production VM)
// In Vercel serverless functions, Vercel invokes the exported default app without needing a port listener
if (!process.env.VERCEL) {
  const server = app.listen(env.PORT, () => {
    console.log('----------------------------------------------------');
    console.log(`🚀 Portfolio Backend running in [${env.NODE_ENV}] mode`);
    console.log(`📡 Server URL:    http://localhost:${env.PORT}`);
    console.log(`🩺 Health check:  http://localhost:${env.PORT}/api/health`);
    console.log(`🔒 Allowed CORS:  ${env.CLIENT_URL}`);
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

