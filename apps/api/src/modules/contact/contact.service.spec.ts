import { Test, TestingModule } from '@nestjs/testing'
import { ContactService } from './contact.service'
import { PrismaService } from '../../prisma/prisma.service'

describe('ContactService', () => {
    let service: ContactService

    const mockPrisma = {
        contactSubmission: {
            create: jest.fn()
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ContactService, { provide: PrismaService, useValue: mockPrisma }]
        }).compile()

        service = module.get<ContactService>(ContactService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('create', () => {
        it('should save to database and return success', async () => {
            const dto = {
                name: 'John Doe',
                email: 'john@example.com',
                services: ['AI Agents', 'AI Workflows'],
                timeline: '1-3 months',
                budget: '$5K-$15K',
                description: 'I need an AI agent'
            }

            const mockSubmission = {
                id: 'uuid-1',
                ...dto,
                services: 'ai,fullstack',
                status: 'NEW',
                createdAt: new Date(),
                updatedAt: new Date()
            }

            mockPrisma.contactSubmission.create.mockResolvedValue(mockSubmission)

            const result = await service.create(dto)

            expect(result).toEqual({
                success: true,
                message: "Thank you! We'll be in touch within 24 hours."
            })
            expect(mockPrisma.contactSubmission.create).toHaveBeenCalledWith({
                data: {
                    ...dto,
                    services: 'AI Agents,AI Workflows'
                }
            })
        })
    })
})
