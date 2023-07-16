import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //회원가입 전체를 불러옴
  @Get()
  async getAllUsers() {
    const users = await this.usersService.userGetAll();
    return users;
  }
  //회원가입
  @Post('/signup')
  async postSignup(@Body() createUserDto: CreateUserDto) {
    const newSignup = await this.usersService.CreateUser(createUserDto);
    return newSignup;
  }
}
