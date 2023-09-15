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

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  async createReservation(
    @Param('id') id: string,
    @Req() reqs: ProductInterface,
    @Req() req: RequestWithUserInterface,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const newReservation = await this.reservationService.productReservation(
      createReservationDto,
      req.user,
      reqs.product,
    );
    return newReservation;
  }
}
