import { Request, Response } from 'express';
import { StatusResponse } from '../types/status';

export const getStatus = (_req: Request, res: Response) => {
  const response: StatusResponse = {
    status: 'ok',
    time: new Date().toISOString(),
  };

  res.json(response);
};
 