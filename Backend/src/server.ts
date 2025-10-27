import express from 'express'
import ConnectDB from './Config/DBSetttings'
import { logger } from './Utils/logger'
import app from './app';

const Port=process.env.PORT;

(async () => {
  try {
    await ConnectDB(); // ✅ wait for DB to connect
    app.listen(Port, () => {
      logger.info(`🚀 Server running on port ${Port}`);
    });
  } catch (error: any) {
    logger.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
})();