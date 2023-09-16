import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  //등록해주는 로직
  async productReservation(
    createReservationDto: CreateReservationDto,
    user: User,
  ) {
    const newReservation = await this.reservationRepository.create({
      ...createReservationDto,
      user: user,
    });
    await this.reservationRepository.save(newReservation);
    return newReservation;
  }
}
