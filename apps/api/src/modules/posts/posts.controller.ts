import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { User } from '@/generated/prisma'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PaginationDto } from '../../common/dto/pagination.dto'
import { CurrentUser } from '../../common/decorators/current-user.decorator'

@ApiTags('posts')
@ApiBearerAuth()
@Controller({ path: 'posts', version: '1' })
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @ApiOperation({ summary: 'List all posts' })
    async findAll(@CurrentUser() user: User, @Query() pagination: PaginationDto) {
        return this.postsService.findAll(user.id, pagination)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by ID' })
    async findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.postsService.findOne(id, user.id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a new post' })
    async create(@Body() dto: CreatePostDto, @CurrentUser() user: User) {
        return this.postsService.create(dto, user.id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a post' })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdatePostDto,
        @CurrentUser() user: User
    ) {
        return this.postsService.update(id, dto, user.id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a post' })
    async remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
        return this.postsService.remove(id, user.id)
    }
}
