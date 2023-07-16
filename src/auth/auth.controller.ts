import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //회원가입
  @Post('signup')
  async userSignup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  //로그인 이메일, 비밀번호맞는지 이메일먼저찾기,
  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.Login(loginUserDto);
  }
}
