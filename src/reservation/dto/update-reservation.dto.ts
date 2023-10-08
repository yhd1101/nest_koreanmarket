import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from '@reservation/dto/create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
