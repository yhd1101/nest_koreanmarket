import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Get,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from '@auth/auth.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { ConfirmEmailDto } from '@users/dto/confirm-email.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from '@users/dto/change-password.dto';
import { GoogleAuthGuard } from '@auth/guards/google-auth.guard';
import { KakaoAuthGuard } from '@auth/guards/kakao-auth.guard';
import { NaverAuthGuard } from '@auth/guards/naver-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //회원가입
  @Post('signup')
  @ApiCreatedResponse({
    description: 'the record has been success with user',
    type: User,
  }) //성공시 응답을 해주겠다.
  async userSignup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('send/email')
  @ApiResponse({
    description: 'email send verify',
  })
  async sendEmail(@Body('email') email: string) {
    return await this.authService.sendEmail(email);
  }

  @Post('confirm/email')
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return await this.authService.confirmEmail(confirmEmailDto);
  }
  //로그인 이메일, 비밀번호맞는지 이메일먼저찾기,
  @Post('login')
  @ApiOperation({ summary: '로그인API', description: '로그인해주는 api' })
  @ApiCreatedResponse({ description: '로그인함', type: User })
  @ApiBody({ type: LoginUserDto })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard) //Guard에서 검증됨
  @ApiResponse({
    description: 'login success',
  })
  async userLogin(@Req() req: RequestWithUserInterface) {
    const user = req.user;
    const token = await this.authService.generateAccessToken(user.id);
    return { token, user };
    // return await this.authService.Login(loginUserDto);
  }

  @Get()
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  @ApiOperation({ summary: '프로필 정보', description: '프로필정보' })
  @UseGuards(JwtAuthGuard)
  async getUserInfoByToken(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    user.password = undefined;
    return user;
  }

  @Post('forgot/password') //비밀번호 재설정위한 메일전송
  @ApiOperation({
    summary: '비밀번호 재설정을위한 메일전송',
    description: '재설정해줌',
  })
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('change/password') //비밀번호 바꾸기
  @ApiOperation({ summary: '비밀번호 바꾸기', description: '비밀번호 수정' })
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    console.log(typeof changePasswordDto.token);
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
  async googleLoginCallBack(
    @Req() req: RequestWithUserInterface,
  ): Promise<any> {
    //token 생성
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    const mainPageUrl = 'http://localhost:3000';
    req.res.redirect(mainPageUrl);
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
