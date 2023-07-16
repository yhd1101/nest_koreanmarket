import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalAuthStategy } from './strategies/local-auth.stategy';

@Module({
  imports: [UsersModule], //service형태로 내보냄
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStategy],
})
export class AuthModule {}
