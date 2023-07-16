import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //회원가입 로직
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.CreateUser(createUserDto);
    return user;
  }

  async Login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);
    if (user.password !== loginUserDto.password) {
      throw new HttpException(
        'Password do not matched',
        HttpStatus.BAD_REQUEST,
      );
    } //email에서 입력한 패스워드랑 우리가 찾는 패스워드가 같지 않으면
    return user;
  }
}
