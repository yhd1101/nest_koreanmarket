//검증해주는 로직
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/entities/user.entity'; //이메일 로그인시 적용되는 보안 라이브러리

@Injectable()
export class LocalAuthStategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', //이메일값을 기준
    });
  }
  //검증되는 함수
  async validate(email: string, password: string): Promise<User> {
    return this.authService.Login({ email, password });
  } //User로 리턴
}
