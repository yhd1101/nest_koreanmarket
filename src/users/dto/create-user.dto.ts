import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@users/entities/provider.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'insert username',
    default: 'username',
  }) //swag적용
  @IsString() //string아니면 에러
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'insert email',
    default: 'abcd@google.com',
  }) //swag적용
  @IsEmail() //email 아니면 에러
  email: string;

  @ApiProperty({
    description: 'insert password',
    default: 'a1234567!',
  }) //swag적용
  @IsString()
  @MinLength(7) //최소 7자리
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  password?: string;

  @ApiProperty({
    description: 'insert provider',
    default: 'local',
  }) //swag적용
  @IsString()
  @IsNotEmpty()
  provider?: Provider;

  @ApiProperty() //swag적용
  @IsOptional() //넣든 안넣든 상관없음 null값 허용
  profileImg?: string;
}
