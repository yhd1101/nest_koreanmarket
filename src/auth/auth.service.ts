import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokenPayloadInterface } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  //회원가입 로직
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersService.CreateUser(createUserDto);
    user.password = undefined; //패스워드를 가려줌 (postman에 안보여짐)
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
    await this.emailService.sendMail({
      to: email,
      subject: '이메일확인',
      html: `이메일 확인용 메일입니다. 아래 번호를 인증해주세요 <br><b><h1>${generateNumber}</h1></b>`,
    });
    return 'success';
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