import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'insert productname',
    default: 'productname',
  })
  @IsString()
  @IsNotEmpty()
  name: string; //필수값아닐때는 ?을 붙여줌 ex) ?:

  @ApiProperty({
    // type: String,
    description: 'insert desc',
    default: ['desc'],
  })
  @IsArray()
  desc?: string[];

  @ApiProperty({
    description: 'insert price',
    default: 1,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    // type: String,
    description: 'insert productImg',
    default: ['String'],
  })
  @IsArray()
  productImg?: string[];

  @ApiProperty({
    description: 'insert category',
    default: ['String'],
    required: false,
  })
  @IsArray()
  category?: string[];

  @ApiProperty({
    description: 'insert region',
    default: 'productname',
  })
  @IsString()
  region?: string;

  @ApiProperty({
    description: 'insert brand',
    default: 'productbrand',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;
}
