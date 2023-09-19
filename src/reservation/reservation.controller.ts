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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiBody({ type: CreateReservationDto })
  @ApiOperation({ summary: '예약하기', description: '예약하기 api' })
  @ApiResponse({
    description: 'reservation success',
  })
  @ApiBearerAuth('access-token')
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
  @ApiOperation({
    summary: '예약 전체리스트',
    description: '예약 전체 리스트 조회',
  })
  async getAllReservation(
    // @Req() req: RequestWithUserInterface,
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
  @ApiOperation({ summary: '예약조회', description: '예약 조회' })
  async getReservationById(@Param('id') id: string) {
    const reservation = await this.reservationService.reservationGetById(id);
    return reservation;
  }
}
