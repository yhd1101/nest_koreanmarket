import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { User } from '../users/entities/user.entity';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createRating(@Body() createRatingDto: CreateRatingDto) {
    const newRating = await this.ratingService.createRating(createRatingDto);
    console.log(newRating);
    return { newRating };
  }
}
