import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { LoggerModule } from 'nestjs-pino'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { SentryModule } from '@sentry/nestjs/setup'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { HealthModule } from './modules/health/health.module'
import { PostsModule } from './modules/posts/posts.module'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { appConfig, AppConfig } from './config/app.config'

@Module({
    imports: [
        // Sentry — must be first import
        SentryModule.forRoot(),

        // Environment config — validated with class-validator
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig],
            envFilePath: ['.env', '../../.env']
        }),

        // Structured logging with Pino
        LoggerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                pinoHttp: {
                    level: config.get<AppConfig>('app')!.logLevel,
                    transport:
                        config.get<AppConfig>('app')!.environment === 'development'
                            ? {
                                  target: 'pino-pretty',
                                  options: { colorize: true, singleLine: true }
                              }
                            : undefined,
                    autoLogging: true,
                    redact: ['req.headers.authorization', 'req.headers.cookie']
                }
            })
        }),

        // Rate limiting
        ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

        // Cache with Redis
        CacheModule.registerAsync({
            isGlobal: true,
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const redisUrl = config.get<AppConfig>('app')!.redisUrl
                if (!redisUrl) return {}
                return { store: await redisStore({ url: redisUrl, ttl: 60000 }) }
            }
        }),

        // Cron jobs
        ScheduleModule.forRoot(),

        // Health checks
        TerminusModule,

        // Database
        PrismaModule,

        // Feature modules
        AuthModule,
        HealthModule,
        PostsModule
    ],
    providers: [
        // Global JWT guard — all routes require auth unless @Public()
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_FILTER, useClass: AllExceptionsFilter }
    ]
})
export class AppModule {}
