import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //product전체 불러오기
  //product 등록하기
  @Post('/create')
  async createProduct(
    @Body('name') name: string,
    @Body('desc') desc: string,
    @Body('price') price: number,
  ) {
    const newProduct = await this.productService.productCreate(
      name,
      desc,
      price,
    );
    return newProduct;
  }
  //product 상세정보 불러오기(id)
  //product update
  //product delete
}
