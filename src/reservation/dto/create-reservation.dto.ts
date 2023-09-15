import { Product } from '../../product/entities/product.entity';

export class CreateReservationDto {
  location: string;
  desc: string;

  purchase: boolean;
  product: Product;
}
