import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //회원가입 로직
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.CreateUser(createUserDto);
    return user;
  }
}
