import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { EmailModule } from '../email/email.module';
import { GoogleAuthStrategy } from './strategies/google-auth.strategy';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { KakaoAuthStrategy } from './strategies/kakao-auth.strategy';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { NaverAuthStrategy } from './strategies/naver-auth.strategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.register({}),
    PassportModule,
    EmailModule,
  ], //service형태로 내보냄
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    JwtAuthStrategy,
    GoogleAuthStrategy,
    KakaoAuthStrategy,
    NaverAuthStrategy,
  ],
})
export class AuthModule {}
