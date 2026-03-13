import { registerAs } from '@nestjs/config';

export interface AppConfig {
  environment: string;
  port: number;
  logLevel: string;
  databaseUrl: string;
  redisUrl: string | undefined;
  jwtSecret: string;
  jwtExpirationMinutes: number;
  corsOrigins: string[];
  sentryDsn: string | undefined;
  sentryEnabled: boolean;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    environment: process.env.ENVIRONMENT ?? 'development',
    port: parseInt(process.env.PORT ?? '8000', 10),
    logLevel: process.env.LOG_LEVEL ?? 'debug',
    databaseUrl: process.env.DATABASE_URL ?? '',
    redisUrl: process.env.REDIS_URL,
    jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
    jwtExpirationMinutes: parseInt(process.env.JWT_EXPIRATION_MINUTES ?? '300', 10),
    corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],
    sentryDsn: process.env.SENTRY_DSN,
    sentryEnabled: process.env.SENTRY_ENABLED === 'true',
  }),
);
