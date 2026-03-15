import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ConflictException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PrismaService } from '../../prisma/prisma.service'

// Mock bcrypt
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn().mockResolvedValue(true)
}))

describe('AuthService', () => {
    let service: AuthService
    let _prisma: PrismaService

    const mockPrisma = {
        user: {
            findUnique: jest.fn(),
            count: jest.fn().mockResolvedValue(0),
            create: jest.fn()
        }
    }

    const mockJwt = { sign: jest.fn().mockReturnValue('mock_token') }
    const mockConfig = {
        get: jest.fn().mockReturnValue({ jwtSecret: 'test', jwtExpirationMinutes: 300 })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: PrismaService, useValue: mockPrisma },
                { provide: JwtService, useValue: mockJwt },
                { provide: ConfigService, useValue: mockConfig }
            ]
        }).compile()

        service = module.get<AuthService>(AuthService)
        _prisma = module.get<PrismaService>(PrismaService)
    })

    afterEach(() => jest.clearAllMocks())

    describe('signup', () => {
        it('should create a new user', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null)
            mockPrisma.user.create.mockResolvedValue({
                id: 'uuid',
                email: 'test@test.com',
                name: 'Test',
                role: 'ADMIN'
            })

            const result = await service.signup({
                email: 'test@test.com',
                password: 'Test123!@',
                name: 'Test'
            })
            expect(result.email).toBe('test@test.com')
            expect(result.role).toBe('ADMIN')
        })

        it('should throw on duplicate email', async () => {
            mockPrisma.user.findUnique.mockResolvedValue({ id: 'existing' })
            await expect(
                service.signup({ email: 'test@test.com', password: 'Test123!@' })
            ).rejects.toThrow(ConflictException)
        })
    })

    describe('validateUser', () => {
        it('should throw on invalid email', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null)
            await expect(service.validateUser('wrong@test.com', 'pass')).rejects.toThrow(
                UnauthorizedException
            )
        })
    })
})
