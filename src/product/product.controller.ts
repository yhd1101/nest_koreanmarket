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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //product전체 불러오기
  @Get()
  @ApiOperation({ summary: '상품조회', description: '전체상품을 조회한다' })
  @ApiResponse({ status: 200, description: 'Get all products', type: 'array' })
  @ApiResponse({ status: 404, description: 'Not Found', type: 'string' })
  async getAllProducts(@Query('category') category?: string) {
    const products = await this.productService.productGetAll(category);
    return products;
  }
  //product 등록하기
  @Post('/create')
  @ApiOperation({ summary: '상품등록', description: '상품을 등록해줌' })
  @ApiResponse({
    status: 201,
    description: 'create all products',
    type: 'array',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: 'string' })
  @UseGuards(JwtAuthGuard) //로그인유무 확인 등록하기위해서
  async createProduct(
    @Req() req: RequestWithUserInterface,
    @Body() createProductDto: CreateProductDto,
    // @Body('name') name: string,
    // @Body('desc') desc: string,
    // @Body('price') price: number,
  ) {
    console.log(createProductDto);
    console.log(req.user);
    const newProduct = await this.productService.productCreate(
      createProductDto,
      req.user,
    );
    return newProduct;
  }
  //product 상세정보 불러오기(id)
  @Get(':id')
  @ApiOperation({
    summary: '상품 상세정보 불러오기',
    description: '상품 상세정보를 불러온다.',
  })
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.productGetById(id);
    return product;
  }

  //product update
  @Put(':id')
  @ApiOperation({ summary: '상품 수정', description: '상품을 수정할수있음' })
  async updateProductById(
    @Body() createProductDto: CreateProductDto,
    @Param('id') id: string,
  ) {
    return await this.productService.productUpdateById(id, createProductDto);
  }
  //product delete
  @Delete(':id')
  @ApiOperation({ summary: '상품삭제', description: '상품을 삭제한다.' })
  async deleteProductByIId(@Param('id') id: string) {
    const product = await this.productService.productDeleteById(id);
    return product;
  }
}
