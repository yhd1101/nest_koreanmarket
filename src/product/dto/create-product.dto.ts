import { User } from '../../users/entities/user.entity';

export class CreateProductDto {
  name: string; //필수값아닐때는 ?을 붙여줌 ex) ?:
  desc?: string[];
  price: number;
  productImg?: string[];
  category: string[];
  region?: string;
  brand: string;
}
