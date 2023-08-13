import {
  Body,
  Controller,
  Param,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUserInterface } from './requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfirmEmailDto } from '../users/dto/confirm-email.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //회원가입
  @Post('signup')
  async userSignup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('send/email')
  async sendEmail(@Body('email') email: string) {
    return await this.authService.sendEmail(email);
  }

  @Post('confirm/email')
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return await this.authService.confirmEmail(confirmEmailDto);
  }
  //로그인 이메일, 비밀번호맞는지 이메일먼저찾기,
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard) //Guard에서 검증됨
  async userLogin(@Req() req: RequestWithUserInterface) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { token, user };
    // return await this.authService.Login(loginUserDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getUserInfoByToken(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    user.password = undefined;
    return user;
  }

  @Post('forgot/password') //비밀번호 재설정위한 메일전송
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('change/paassword') //비밀번호 바꾸기
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(changePasswordDto);
  }
  //구글에 접속하는 코드(로그인요청 코드)
  @HttpCode(200)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  //요청을 받고 구글에서 던져주는 정보를 아래 api에 받겠다.
  @HttpCode(200)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallBack(@Req() req: any): Promise<any> {
    //token 생성
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { token, user };
  }

  @HttpCode(200)
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @HttpCode(200)
  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallBack(@Req() req: any): Promise<any> {
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { token, user };
  }

  //naver
  @HttpCode(200)
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin(): Promise<any> {
    return HttpStatus.OK;
  }
  @HttpCode(200)
  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverLoginCallBack(@Req() req: any): Promise<any> {
    const { user } = req;
    return user;
  }
}
