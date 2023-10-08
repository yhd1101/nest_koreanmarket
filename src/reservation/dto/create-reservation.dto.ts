import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Product } from '@product/entities/product.entity';

export class CreateReservationDto {
  @ApiProperty({
    description: 'insert location',
    default: '뉴욕',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'insert desc',
    default: 'Comment',
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'insert purchase',
    default: true,
  })
  @IsBoolean()
  purchase: boolean;

  @ApiProperty({
    description: 'insert productid',
    default: 'productId',
  })
  @IsString()
  product: Product;
}
