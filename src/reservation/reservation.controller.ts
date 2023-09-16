import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { ProductInterface } from '../auth/interfaces/product.interface';

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
  async getAllReservation() {
    const reservations = await this.reservationService.reservationGetAll();
    return reservations;
  }

  @Get(':id')
  async getReservationById(@Param('id') id: string) {
    const reservation = await this.reservationService.reservationGetById(id);
    return reservation;
  }
}
