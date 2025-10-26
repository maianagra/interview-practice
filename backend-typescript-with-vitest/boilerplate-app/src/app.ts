import express from 'express';
import statusRouter from './routes/status';

const app = express();

app.use(express.json());
app.use('/status', statusRouter);

export default app;
