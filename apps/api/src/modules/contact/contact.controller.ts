import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { Public } from '../../common/decorators/public.decorator'

@ApiTags('contact')
@Controller({ path: 'contact', version: '1' })
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    @Public()
    @Throttle({ default: { ttl: 3600000, limit: 3 } })
    @ApiOperation({ summary: 'Submit a contact form' })
    async create(@Body() dto: CreateContactDto) {
        return this.contactService.create(dto)
    }
}
