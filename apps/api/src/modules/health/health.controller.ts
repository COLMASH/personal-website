import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    DiskHealthIndicator
} from '@nestjs/terminus'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Public } from '../../common/decorators/public.decorator'
import { PrismaHealthIndicator } from './prisma.health'
import { PrismaService } from '../../prisma/prisma.service'

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: PrismaHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
        private prisma: PrismaService
    ) {}

    @Public()
    @Get('ci-test')
    @ApiOperation({ summary: 'CI/CD pipeline test endpoint' })
    async ciTest() {
        const row = await this.prisma.ciTest.upsert({
            where: { id: 'ci-smoke-test' },
            update: { checkedAt: new Date() },
            create: { id: 'ci-smoke-test', status: true }
        })
        return {
            status: 'ok',
            ciTest: true,
            dbWrite: true,
            timestamp: row.checkedAt.toISOString()
        }
    }

    @Public()
    @Get()
    @HealthCheck()
    @ApiOperation({ summary: 'Health check' })
    check() {
        return this.health.check([
            () => this.db.isHealthy('database'),
            () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
            () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.9 })
        ])
    }
}
