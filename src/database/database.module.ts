import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
