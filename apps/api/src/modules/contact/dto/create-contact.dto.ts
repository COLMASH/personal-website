import { IsString, IsEmail, IsOptional, IsArray, MinLength, ArrayMinSize } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateContactDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @MinLength(2)
    name: string

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    email: string

    @ApiPropertyOptional({ example: 'https://acme.com' })
    @IsOptional()
    @IsString()
    website?: string

    @ApiProperty({ example: ['ai', 'fullstack'], type: [String] })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    services: string[]

    @ApiProperty({ example: '1-3 months' })
    @IsString()
    @MinLength(1)
    timeline: string

    @ApiProperty({ example: '$5K-$15K' })
    @IsString()
    @MinLength(1)
    budget: string

    @ApiProperty({ example: 'I need an AI agent for...' })
    @IsString()
    @MinLength(1)
    description: string
}
