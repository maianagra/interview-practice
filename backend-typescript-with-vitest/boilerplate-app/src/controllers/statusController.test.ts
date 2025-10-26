import { describe, it, expect } from 'vitest';
import { getStatus } from './statusController';
import { StatusResponse } from '../types/status';

describe('statusController', () => {
  it('should return a valid status response object', () => {
    // Mock the response object
    const res: any = {
      json: (data: StatusResponse) => {
        res.body = data;
      },
    };

    getStatus({} as any, res);

    expect(res.body).toBeDefined();
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.time).toBe('string');
  });
});
