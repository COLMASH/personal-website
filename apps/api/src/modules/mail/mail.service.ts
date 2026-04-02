import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { CreateContactDto } from '../contact/dto/create-contact.dto'

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)

    constructor(private readonly mailerService: MailerService) {}

    async sendContactNotification(dto: CreateContactDto): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: 'santanaai.co@gmail.com',
                subject: `New Contact: ${dto.name} — ${dto.services.join(', ')}`,
                template: 'contact-notification',
                context: {
                    name: dto.name,
                    email: dto.email,
                    website: dto.website ?? 'Not provided',
                    services: dto.services.join(', '),
                    timeline: dto.timeline,
                    budget: dto.budget,
                    description: dto.description
                }
            })
            this.logger.log(`Contact notification sent for ${dto.name} (${dto.email})`)
        } catch (error) {
            this.logger.error(`Failed to send contact notification: ${error}`)
        }
    }
}
