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
    user.password = undefined; //패스워드를 가려줌 (postman에 안보여짐)
    return user;
  }

  async Login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);
    const isPasswordMatched = await user.validatePassword(
      loginUserDto.password,
    ); //성공여부

    if (!isPasswordMatched) {
      throw new HttpException(
        'Password do not matched',
        HttpStatus.BAD_REQUEST,
      );
    } //email에서 입력한 패스워드랑 우리가 찾는 패스워드가 같지 않으면
    user.password = undefined;
    return user;
  }
}
