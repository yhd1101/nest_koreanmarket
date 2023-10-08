import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@users/entities/provider.enum';
import { UsersService } from '@users/users.service';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(
  Strategy,
  Provider.KAKAO,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get('KAKAO_AUTH_CLIENTID'),
      callbackURL: configService.get('KAKAO_AUTH_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { displayName, provider } = profile;
    const { profile_image } = profile._json.properties;
    const { email } = profile._json.kakao_account;
    const userInput = {
      name: displayName,
      email,
      provider,
      picture: profile_image,
    };
    console.log(userInput);
    try {
      const user = await this.usersService.getUserByEmail(email);
      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      done(null, user);
    } catch (err) {
      if (err.status === 404) {
        const newUser = await this.usersService.CreateUser({
          email,
          name: displayName,
          provider,
          profileImg: profile_image,
        });
        done(null, newUser);
      }
    }
  }
}
