import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
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
      user,
    });
    await this.reservationRepository.save(newReservation);
    return newReservation;
  }
  async reservationGetAll(user?: User, product?: Product) {
    // const reservations = await this.reservationRepository.find({
    //   relations: ['users'], //관계형으로 이어진것을 보여줌
    // });
    // return { count: reservations.length, reservations };
    const queryBuilder = await this.reservationRepository.createQueryBuilder(
      'reservation',
    );
    queryBuilder.leftJoinAndSelect('reservation.user', 'users');
    queryBuilder.leftJoinAndSelect('reservation.product', 'product');

    if (user) {
      queryBuilder.where('reservation.user = :user', { user });
    }
    if (product) {
      queryBuilder.where('reservation.product.id = :product', { product });
    }
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
  }

  async reservationGetById(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
    if (reservation) return reservation;
    throw new HttpException('No reservation', HttpStatus.NOT_FOUND);
  }
}
