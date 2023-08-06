import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2'; //확인 잘하기
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Provider } from '../../users/entities/provider.enum';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.GOOGLE,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENTID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENTSECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // done(null, profile);
    const { displayName, email, provider, picture } = profile;
    const userInput = {
      name: displayName,
      email,
      provider,
      picture,
    };
    console.log(userInput);
    try {
      const user = await this.usersService.getUserByEmail(email);
      //로그인 처리
      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      done(null, user);
    } catch (err) {
      //이메일이 없으면 회원가입
      if (err.status === 404) {
        const newUser = await this.usersService.CreateUser({
          email,
          name: displayName,
          provider,
          profileImg: picture,
        });
        done(null, newUser);
      }
    }
  }
}
