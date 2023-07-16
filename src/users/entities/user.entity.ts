import { BeforeInsert, Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs'; //자바스크립트라이브러리를 가져와야해서 * as를 해줌

@Entity()
export class User extends CommonEntity {
  @Column()
  public name: string;
  @Column({ unique: true }) //중복값 허용 x
  public email: string;
  @Column()
  public password: string;

  @BeforeInsert() //데이터를 넣기전에 실행하는 함수
  async hashPassword() {
    try {
      //패스워드 암호화
      const saltValue = await bcrypt.genSalt(10); //암호화되는 키값
      this.password = await bcrypt.hash(this.password, saltValue);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
  //로그인할때 패스워드인증(암호화된패스워드를 맞는지 안맞는지 확인해줌)
  async validatePassword(aPassword: string) {
    try {
      const isPasswordMatch = await bcrypt.compare(aPassword, this.password);
      return isPasswordMatch;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
