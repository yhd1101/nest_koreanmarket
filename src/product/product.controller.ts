import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';

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
  @UseGuards(JwtAuthGuard) //로그인유무 확인 등록하기위해서
  async createProduct(
    @Req() req: RequestWithUserInterface,
    @Body() createProductDto: CreateProductDto,
    // @Body('name') name: string,
    // @Body('desc') desc: string,
    // @Body('price') price: number,
  ) {
    const newProduct = await this.productService.productCreate(
      createProductDto,
      req.user,
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
