import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePostDto {
    @ApiProperty({ example: 'My Post' })
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    name: string

    @ApiPropertyOptional({ example: 'A description of this post' })
    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string
}
