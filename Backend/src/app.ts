import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { configDotenv } from 'dotenv';
import authRoutes from './Routes/UserRoutes'
configDotenv();

import { logger } from './Utils/logger';

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use(`/api/auth`,authRoutes)

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
