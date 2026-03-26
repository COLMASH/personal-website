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

    @ApiPropertyOptional({ example: 'Acme Inc' })
    @IsOptional()
    @IsString()
    company?: string

    @ApiPropertyOptional({ example: 'https://acme.com' })
    @IsOptional()
    @IsString()
    website?: string

    @ApiProperty({ example: ['ai', 'fullstack'], type: [String] })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    services: string[]

    @ApiPropertyOptional({ example: '1-3-months' })
    @IsOptional()
    @IsString()
    timeline?: string

    @ApiPropertyOptional({ example: '5k-15k' })
    @IsOptional()
    @IsString()
    budget?: string

    @ApiPropertyOptional({ example: 'I need an AI agent for...' })
    @IsOptional()
    @IsString()
    description?: string
}
