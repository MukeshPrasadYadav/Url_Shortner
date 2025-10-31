import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { authRoutes } from './Routes/AuthRoutes';
import {  UserRoutes } from './Routes/UserRoutes';

import { logger } from './Utils/logger';

const app=express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use(`/api/auth`,authRoutes)
app.use(`/api/user`,UserRoutes)

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
