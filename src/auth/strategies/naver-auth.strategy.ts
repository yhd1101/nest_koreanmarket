import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-naver-v2';
import { Provider } from '@users/entities/provider.enum';
import { UsersService } from '@users/users.service';

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
