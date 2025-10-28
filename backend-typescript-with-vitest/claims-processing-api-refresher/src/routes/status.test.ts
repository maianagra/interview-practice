import request from 'supertest';
import app from '../app';
import { describe, it, expect } from 'vitest';

describe('GET /status route', () => {
  it('should return 200 and a valid JSON response', async () => {
    const res = await request(app).get('/status');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('time');
    expect(typeof res.body.time).toBe('string');
  });
});
