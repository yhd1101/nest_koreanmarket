import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2'; //확인 잘하기
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
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
    done(null, profile);
  }
}
