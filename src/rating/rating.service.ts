import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '@rating/entities/rating.entity';
import { CreateRatingDto } from '@rating/dto/create-rating.dto';
import { User } from '@users/entities/user.entity';

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
