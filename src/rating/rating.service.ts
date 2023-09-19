import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async createRating(createRatingDto: CreateRatingDto) {
    const newRating = await this.ratingRepository.create({
      ...createRatingDto,
    });
    console.log(createRatingDto);
    await this.ratingRepository.save(newRating);
    return newRating;
  }
}
