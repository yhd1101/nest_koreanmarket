import { Product } from '@product/entities/product.entity';

export interface ProductInterface extends Request {
  product: Product;
}
