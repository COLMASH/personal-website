import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from '@nestjs-modules/mailer'
import { MailService } from './mail.service'

describe('MailService', () => {
    let service: MailService

    const mockMailerService = {
        sendMail: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MailService, { provide: MailerService, useValue: mockMailerService }]
        }).compile()

        service = module.get<MailService>(MailService)
    })

    afterEach(() => jest.clearAllMocks())

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    describe('sendContactNotification', () => {
        const dto = {
            name: 'John Doe',
            email: 'john@example.com',
            services: ['AI Agents', 'AI Workflows'],
            timeline: '1-3 months',
            budget: '$5K-$15K',
            description: 'I need an AI agent'
        }

        it('should send email with correct parameters', async () => {
            mockMailerService.sendMail.mockResolvedValue(undefined)

            await service.sendContactNotification(dto)

            expect(mockMailerService.sendMail).toHaveBeenCalledWith({
                to: 'santanaai.co@gmail.com',
                subject: 'New Contact: John Doe — AI Agents, AI Workflows',
                template: 'contact-notification',
                context: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    website: 'Not provided',
                    services: 'AI Agents, AI Workflows',
                    timeline: '1-3 months',
                    budget: '$5K-$15K',
                    description: 'I need an AI agent'
                }
            })
        })

        it('should not throw when email sending fails', async () => {
            mockMailerService.sendMail.mockRejectedValue(new Error('SMTP error'))

            await expect(service.sendContactNotification(dto)).resolves.not.toThrow()
        })
    })
})
