import { User } from '@users/entities/user.entity';

export class CreateRatingDto {
  rating: number;
  seller: User;
}
