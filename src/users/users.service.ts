import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //전체불러옴
  async userGetAll() {
    const users = await this.userRepository.find();
    return { count: users.length, users };
  }

  //회원가입
  async CreateUser(createUserDto: CreateUserDto) {
    const newSignup = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newSignup);
    return newSignup;
  }
}
