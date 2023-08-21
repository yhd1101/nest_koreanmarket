import { Product } from '../../product/entities/product.entity';

export class CreateCommentDto {
  desc: string;
  product: Product;
}
