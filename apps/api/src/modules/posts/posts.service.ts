import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto'
import { Post } from '@/generated/prisma'

const ALLOWED_SORT_COLUMNS = new Set(['name', 'createdAt', 'updatedAt'])

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(userId: string, pagination: PaginationDto): Promise<PaginatedResponse<Post>> {
        const { page, pageSize, sortBy, sortOrder } = pagination
        const orderBy = ALLOWED_SORT_COLUMNS.has(sortBy) ? sortBy : 'createdAt'

        const [items, total] = await Promise.all([
            this.prisma.post.findMany({
                where: { userId },
                orderBy: { [orderBy]: sortOrder },
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            this.prisma.post.count({ where: { userId } })
        ])

        return new PaginatedResponse(items, total, page, pageSize)
    }

    async findOne(id: string, userId: string): Promise<Post> {
        const item = await this.prisma.post.findFirst({
            where: { id, userId }
        })
        if (!item) throw new NotFoundException('Post not found')
        return item
    }

    async create(dto: CreatePostDto, userId: string): Promise<Post> {
        return this.prisma.post.create({
            data: { ...dto, userId }
        })
    }

    async update(id: string, dto: UpdatePostDto, userId: string): Promise<Post> {
        await this.findOne(id, userId)
        return this.prisma.post.update({
            where: { id },
            data: dto
        })
    }

    async remove(id: string, userId: string): Promise<void> {
        await this.findOne(id, userId)
        await this.prisma.post.delete({ where: { id } })
    }
}
