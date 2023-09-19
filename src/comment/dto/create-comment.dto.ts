import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'insert desc',
    default: 'Comment',
  })
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'insert productid',
    default: 'productId',
  })
  @IsString()
  product: Product;
}
