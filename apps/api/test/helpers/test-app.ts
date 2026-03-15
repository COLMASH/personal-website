import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prisma/prisma.service'

export async function createTestApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile()

    const app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true }
        })
    )
    await app.init()
    return app
}

export async function cleanDatabase(app: INestApplication): Promise<void> {
    const prisma = app.get(PrismaService)
    // Add tables in reverse dependency order
    await prisma.user.deleteMany()
}
