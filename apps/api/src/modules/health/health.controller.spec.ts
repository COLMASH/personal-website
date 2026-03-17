import { Test, TestingModule } from '@nestjs/testing'
import { HealthCheckService, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { PrismaHealthIndicator } from './prisma.health'
import { PrismaService } from '../../prisma/prisma.service'

describe('HealthController', () => {
    let controller: HealthController

    const mockCheckedAt = new Date('2026-03-17T00:00:00.000Z')

    const mockPrismaService = {
        ciTest: {
            upsert: jest.fn().mockResolvedValue({
                id: 'ci-smoke-test',
                status: true,
                checkedAt: mockCheckedAt
            })
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
            providers: [
                { provide: HealthCheckService, useValue: { check: jest.fn() } },
                { provide: PrismaHealthIndicator, useValue: { isHealthy: jest.fn() } },
                { provide: MemoryHealthIndicator, useValue: { checkHeap: jest.fn() } },
                { provide: DiskHealthIndicator, useValue: { checkStorage: jest.fn() } },
                { provide: PrismaService, useValue: mockPrismaService }
            ]
        }).compile()

        controller = module.get<HealthController>(HealthController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('ciTest', () => {
        it('should upsert a row and return a DB-backed response', async () => {
            const result = await controller.ciTest()

            expect(mockPrismaService.ciTest.upsert).toHaveBeenCalledWith({
                where: { id: 'ci-smoke-test' },
                update: { checkedAt: expect.any(Date) },
                create: { id: 'ci-smoke-test', status: true }
            })

            expect(result).toEqual({
                status: 'ok',
                ciTest: true,
                dbWrite: true,
                timestamp: mockCheckedAt.toISOString()
            })
        })
    })
})
