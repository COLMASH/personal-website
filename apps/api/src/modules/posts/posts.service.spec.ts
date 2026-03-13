import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PostsService', () => {
  let service: PostsService;

  const mockPrisma = {
    post: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('should return paginated posts', async () => {
      const mockItems = [
        { id: '1', name: 'Post 1', userId: 'user-1' },
        { id: '2', name: 'Post 2', userId: 'user-1' },
      ];
      mockPrisma.post.findMany.mockResolvedValue(mockItems);
      mockPrisma.post.count.mockResolvedValue(2);

      const result = await service.findAll('user-1', { page: 1, pageSize: 20, sortBy: 'createdAt', sortOrder: 'desc' });
      expect(result.data).toHaveLength(2);
      expect(result.meta.total).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a post', async () => {
      const mockPost = { id: '1', name: 'Post 1', userId: 'user-1' };
      mockPrisma.post.findFirst.mockResolvedValue(mockPost);

      const result = await service.findOne('1', 'user-1');
      expect(result.name).toBe('Post 1');
    });

    it('should throw NotFoundException when post not found', async () => {
      mockPrisma.post.findFirst.mockResolvedValue(null);
      await expect(service.findOne('999', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const mockPost = { id: '1', name: 'New Post', description: 'Description', userId: 'user-1' };
      mockPrisma.post.create.mockResolvedValue(mockPost);

      const result = await service.create({ name: 'New Post', description: 'Description' }, 'user-1');
      expect(result.name).toBe('New Post');
      expect(mockPrisma.post.create).toHaveBeenCalledWith({
        data: { name: 'New Post', description: 'Description', userId: 'user-1' },
      });
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      mockPrisma.post.findFirst.mockResolvedValue({ id: '1', userId: 'user-1' });
      mockPrisma.post.delete.mockResolvedValue({ id: '1' });

      await service.remove('1', 'user-1');
      expect(mockPrisma.post.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when deleting non-existent post', async () => {
      mockPrisma.post.findFirst.mockResolvedValue(null);
      await expect(service.remove('999', 'user-1')).rejects.toThrow(NotFoundException);
    });
  });
});
