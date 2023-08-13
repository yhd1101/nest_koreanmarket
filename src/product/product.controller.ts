import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //product전체 불러오기
  @Get()
  async getAllProducts() {
    const products = await this.productService.productGetAll();
    return products;
  }
  //product 등록하기
  @Post('/create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    // @Body('name') name: string,
    // @Body('desc') desc: string,
    // @Body('price') price: number,
  ) {
    const newProduct = await this.productService.productCreate(
      createProductDto,
    );
    return newProduct;
  }
  //product 상세정보 불러오기(id)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.productGetById(id);
    return product;
  }
  //product update
  @Put(':id')
  async updateProductById(
    @Body() createProductDto: CreateProductDto,
    @Param('id') id: string,
  ) {
    return await this.productService.productUpdateById(id, createProductDto);
  }
  //product delete
  @Delete(':id')
  async deleteProductByIId(@Param('id') id: string) {
    const product = await this.productService.productDeleteById(id);
    return product;
  }
}
