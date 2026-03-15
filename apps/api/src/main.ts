import './instrument' // Must be first import

import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true })

    // Pino logger — replaces all NestJS internal logging
    app.useLogger(app.get(Logger))

    // Security headers
    app.use(helmet())

    // CORS — strict origin list from env
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],
        credentials: true
    })

    // API versioning
    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true }
        })
    )

    // Swagger — only in development
    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('personal-website API')
            .setDescription('API documentation')
            .setVersion('1.0')
            .addBearerAuth()
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup('docs', app, document)
    }

    await app.listen(process.env.PORT ?? 8000)
}

bootstrap()
