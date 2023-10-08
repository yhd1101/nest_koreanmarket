import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '@users/users.service';
import { CreateUserDto } from '@users/dto/create-user.dto';

@ApiTags('Users')
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
  @Post('/create')
  async postSignup(@Body() createUserDto: CreateUserDto) {
    const newSignup = await this.usersService.CreateUser(createUserDto);
    return newSignup;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return user;
  }
}
