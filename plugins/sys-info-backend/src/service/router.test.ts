import { getVoidLogger } from '@backstage/backend-common';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const router = await createRouter({
      logger: getVoidLogger(),
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /system-info', () => {
    it('returns system info', async () => {
      const response = await request(app).get('/system-info');

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('hostname');
      expect(response.body).toHaveProperty('operatingSystem');
      expect(response.body).toHaveProperty('platform');
    });
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });
});
