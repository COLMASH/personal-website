import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, cleanDatabase } from './helpers/test-app';
import { createTestUser, getAuthToken } from './helpers/auth.helper';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await cleanDatabase(app);
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase(app);
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({ email: 'new@example.com', password: 'NewUser123!@', name: 'New User' });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe('new@example.com');
      expect(res.body.data.role).toBe('ADMIN'); // First user is admin
    });

    it('should reject duplicate email', async () => {
      await createTestUser(app);

      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({ email: 'test@example.com', password: 'Test123!@' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should return access token', async () => {
      await createTestUser(app);

      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'Test123!@' });

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.tokenType).toBe('bearer');
    });

    it('should reject invalid credentials', async () => {
      await createTestUser(app);

      const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email: 'test@example.com', password: 'wrong' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('should return current user', async () => {
      await createTestUser(app);
      const token = await getAuthToken(app);

      const res = await request(app.getHttpServer())
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('test@example.com');
    });

    it('should reject unauthenticated request', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
    });
  });
});
