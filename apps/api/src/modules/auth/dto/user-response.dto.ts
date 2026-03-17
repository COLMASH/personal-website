import { ApiProperty } from '@nestjs/swagger'
import { User } from '@/generated/prisma'

export class UserResponseDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    email: string

    @ApiProperty({ nullable: true })
    name: string | null

    @ApiProperty()
    role: string

    @ApiProperty()
    isActive: boolean

    @ApiProperty()
    createdAt: Date

    static fromEntity(user: User): UserResponseDto {
        const dto = new UserResponseDto()
        dto.id = user.id
        dto.email = user.email
        dto.name = user.name
        dto.role = user.role
        dto.isActive = user.isActive
        dto.createdAt = user.createdAt
        return dto
    }
}
