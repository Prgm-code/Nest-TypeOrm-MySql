import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostService', () => {
  let service: PostService;
  let usersService: UsersService;
  let repo: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        UsersService,
        { provide: getRepositoryToken(Post), useClass: Repository },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    usersService = module.get<UsersService>(UsersService);
    repo = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersService).toBeDefined();
    expect(repo).toBeDefined();
  });

  const user = { id: 1, name: 'Test User', username: 'testuser', email: 'testuser@example.com', password: 'password', createdAt: new Date() };

  describe('update', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Title',
        content: 'Updated Content',
        autorId: 2
      };
      const expectedResponse = `This action updates a #${postId} post`;

      expect(await service.update(postId, updatePostDto)).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const postId = 1;
      const expectedResponse = `This action removes a #${postId} post`;

      expect(await service.remove(postId)).toEqual(expectedResponse);
    });
  });
});
