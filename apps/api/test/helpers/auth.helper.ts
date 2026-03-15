import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'

export async function createTestUser(
    app: INestApplication,
    overrides: Record<string, string> = {}
) {
    const userData = {
        email: overrides.email ?? 'test@example.com',
        password: 'Test123!@',
        name: overrides.name ?? 'Test User',
        ...overrides
    }

    const res = await request(app.getHttpServer()).post('/api/v1/auth/signup').send(userData)
    return res.body
}

export async function getAuthToken(
    app: INestApplication,
    email = 'test@example.com',
    password = 'Test123!@'
) {
    const res = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({ email, password })
    return res.body.data.accessToken as string
}

export async function authRequest(app: INestApplication, token: string) {
    return {
        get: (url: string) =>
            request(app.getHttpServer()).get(url).set('Authorization', `Bearer ${token}`),
        post: (url: string) =>
            request(app.getHttpServer()).post(url).set('Authorization', `Bearer ${token}`),
        put: (url: string) =>
            request(app.getHttpServer()).put(url).set('Authorization', `Bearer ${token}`),
        delete: (url: string) =>
            request(app.getHttpServer()).delete(url).set('Authorization', `Bearer ${token}`)
    }
}
