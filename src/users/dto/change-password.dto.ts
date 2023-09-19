import { ApiProperty } from '@nestjs/swagger';
import { IsString, isString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'insert token',
    default: ' ',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'insert password',
    default: 'a1234567!',
  }) //swag적용
  @MinLength(7) //최소 7자리
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  @IsString()
  newPassword: string;
}
