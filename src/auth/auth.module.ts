import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalAuthStategy } from './strategies/local-auth.stategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStategy } from './strategies/jwt-auth.stategy';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.register({}),
    PassportModule,
    EmailModule,
  ], //service형태로 내보냄
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStategy, JwtAuthStategy],
})
export class AuthModule {}
