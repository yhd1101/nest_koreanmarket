import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { AuthModule } from '@auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from '@product/product.module';
import { OrderModule } from '@order/order.module';
import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '@users/users.module';
import { EmailModule } from '@email/email.module';
import { ReservationModule } from '@reservation/reservation.module';
import { RatingModule } from '@rating/rating.module';
import { RedisModule } from '@redis/redis.module';
import { CommentModule } from '@comment/comment.module';
import { AppConfigModule } from '@common/config/config.module';

@Module({
  imports: [
    AppConfigModule,
    ProductModule,
    OrderModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    EmailModule,
    RedisModule,
    CommentModule,
    ReservationModule,
    RatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
