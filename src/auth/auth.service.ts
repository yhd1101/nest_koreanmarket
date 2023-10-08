import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager'; //확인잘하기
import { UsersService } from '@users/users.service';
import { EmailService } from '@email/email.service';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { LoginUserDto } from '@users/dto/login-user.dto';
import { TokenPayloadInterface } from '@auth/interfaces/tokenPayload.interface';
import { verificationEmail } from '@common/template/verificationEmail';
import { ConfirmEmailDto } from '@users/dto/confirm-email.dto';
import { VerificationTokenPayloadInterface } from '@auth/interfaces/verificationTokenPayload.interface';
import { ChangePasswordDto } from '@users/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManger: Cache, //redis db불러옴
  ) {}

  //회원가입 로직
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.CreateUser(createUserDto);
    user.password = undefined; //패스워드를 가려줌
    await this.emailService.sendMail({
      to: createUserDto.email,
      subject: 'Welcome to koreanmarket',
      text: 'welcome',
      // html: sendEmail(createUserDto.name),
    });
    return user;
  }

  async Login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(loginUserDto.email);
    const isPasswordMatched = await user.validatePassword(
      loginUserDto.password,
    ); //성공여부

    if (!isPasswordMatched) {
      throw new HttpException(
        'Password do not matched',
        HttpStatus.BAD_REQUEST,
      );
    } //email에서 입력한 패스워드랑 우리가 찾는 패스워드가 같지 않으면
    user.password = undefined;
    return user;
  }

  //access토큰 생성함수
  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESSTOKEN_SECRET_KEY'),
      expiresIn: `${this.configService.get('ACCESSTOKEN_EXPIRATION_TIME')}m`,
    });
    return token;
  }

  async sendEmail(email: string) {
    const generateNumber = this.generateOTP();
    await this.cacheManger.set(email, generateNumber);
    await this.emailService.sendMail({
      to: email,
      subject: '이메일확인',
      // html: `이메일 확인용 메일입니다. 아래 번호를 인증해주세요 <br><b><h1>${generateNumber}</h1></b>`,
      html: verificationEmail(generateNumber),
    });
    return 'success';
  }

  async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
    const emailCodeByRedis = await this.cacheManger.get(confirmEmailDto.email);
    if (emailCodeByRedis !== confirmEmailDto.code) {
      throw new BadRequestException('Wrong code provided');
    }
    await this.cacheManger.del(confirmEmailDto.email);
    return true;
  }
  async forgotPassword(email: string) {
    const payload: VerificationTokenPayloadInterface = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_CHAGNE_PASSWORD_SECRET'),
      expiresIn: this.configService.get('JWT_CHAGNE_PASSWORD_EXPIRESIN'), //10분동안 유효한 token
    });
    const url = `${this.configService.get(
      'PASSWORD_CHANGE_URL',
    )}?token=${token}`;
    await this.emailService.sendMail({
      to: email,
      subject: 'forgot password - koreamarket',
      html: `
        <h3>패스워드 변경하려면 아래 버튼을 눌러주세요</h3> <br>
        <h1>${url}</h1>
        `,
    });
    return true;
  }
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const email = await this.decodedConfirmationToken(changePasswordDto.token);
    console.log(changePasswordDto.token);
    return await this.usersService.changePassword(
      email,
      changePasswordDto.newPassword,
    ); //패스워드바꾸기 함수 먼저만들고하기
  }

  //토큰 푸는 함수
  public async decodedConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_CHAGNE_PASSWORD_SECRET'),
      });
      return payload.email;
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('token expired error');
      } else {
        throw new BadRequestException('token error');
      }
    }
  }

  //랜덤함수
  generateOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }
}
