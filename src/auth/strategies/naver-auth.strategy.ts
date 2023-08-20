import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Provider } from '../../users/entities/provider.enum';
import { Profile, Strategy } from 'passport-naver-v2';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.NAVER,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // clientID: configService.get('NAVER_AUTH_CLIENTID'),
      // clientSecret: configService.get('NAVER_AUTH_CLIENTSECRET'),
      // callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
      // scope: ['profile', 'email'],
      clientID: configService.get('NAVER_AUTH_CLIENTID'),
      clientSecret: configService.get('NAVER_AUTH_CLIENTSECRET'),
      callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
      scope: ['email', 'name', 'nickname'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    done(null, profile);
  }
}
