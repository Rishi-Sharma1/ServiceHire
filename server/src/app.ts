import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middleware/error.middleware'
import { env } from './config/env.config';
import { globalLimiter } from './middleware/rate-limit.middleware';
import routes from './routes';

const app = express();

app.use(globalLimiter);

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use('/api', routes);

app.get('/api/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
    });
});

app.use(errorMiddleware);

export default app;