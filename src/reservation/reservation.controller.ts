import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { User } from '../users/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReservation(
    @Req() req: RequestWithUserInterface,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const newReservation = await this.reservationService.productReservation(
      createReservationDto,
      req.user,
    );
    return newReservation;
  }

  @Get()
  async getAllReservation(
    @Query('user') user?: User,
    @Query('product') product?: Product,
  ) {
    const reservations = await this.reservationService.reservationGetAll(
      user,
      product,
    );
    return reservations;
  }

  @Get(':id')
  async getReservationById(@Param('id') id: string) {
    const reservation = await this.reservationService.reservationGetById(id);
    return reservation;
  }
}
