import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { User } from '@users/entities/user.entity';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //db활용
    private userRepository: Repository<User>,
  ) {}

  //전체불러옴
  async userGetAll() {
    const users = await this.userRepository.find();
    return { count: users.length, users };
  }

  //user생성로직
  async CreateUser(createUserDto: CreateUserDto) {
    const newSignup = await this.userRepository.create(createUserDto);
    // newSignup.provider = Provider.LOCAL;
    await this.userRepository.save(newSignup);
    return newSignup;
  }

  //user 찾기(by id)
  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No user Id');
    }
    return user;
  }

  //email로 찾기
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('No user Email');
    }
    return user;
  }

  //패스워드 바꾸기
  async changePassword(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    user.password = await bcrypt.hash(password, 10);
    return this.userRepository.save(user);
  }
}
