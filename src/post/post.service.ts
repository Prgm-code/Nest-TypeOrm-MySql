import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor (

    @InjectRepository(Post) private postRepository: Repository<Post>,
    private usersService: UsersService
  ) { }


  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUser(post.autorId);

  if (!userFound) {
    return new HttpException('User not found', HttpStatus.NOT_FOUND);
  } 
  const newPost =  await this.postRepository.create(post);
  return this.postRepository.save(newPost);
 }

  getPosts() {
    return this.postRepository.find({
      relations: ['author'],
    }); 
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
