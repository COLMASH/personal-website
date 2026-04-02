import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { MailService } from '../mail/mail.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name)

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService
    ) {}

    async create(dto: CreateContactDto) {
        await this.prisma.contactSubmission.create({
            data: {
                ...dto,
                services: dto.services.join(',')
            }
        })

        this.logger.log(`New contact submission from ${dto.name} (${dto.email})`)

        this.mailService.sendContactNotification(dto).catch(error => {
            this.logger.error(`Mail notification failed: ${error}`)
        })

        return {
            success: true,
            message: "Thank you! We'll be in touch within 24 hours."
        }
    }
}
