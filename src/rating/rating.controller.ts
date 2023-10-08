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
import { RatingService } from '@rating/rating.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CreateRatingDto } from '@rating/dto/create-rating.dto';

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
