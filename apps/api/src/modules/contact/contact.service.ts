import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
    private readonly logger = new Logger(ContactService.name)

    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateContactDto) {
        await this.prisma.contactSubmission.create({
            data: {
                ...dto,
                services: dto.services.join(',')
            }
        })

        this.logger.log(`New contact submission from ${dto.name} (${dto.email})`)
        this.logger.log('Email notification would be sent to migangsant@gmail.com')

        return {
            success: true,
            message: "Thank you! We'll be in touch within 24 hours."
        }
    }
}
