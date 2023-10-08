import { PartialType } from '@nestjs/swagger';
import { CreateRatingDto } from '@rating/dto/create-rating.dto';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {}
