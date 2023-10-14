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

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from '@product/product.service';
import { CreateProductDto } from '@product/dto/create-product.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { PageDto } from '@common/dtos/page.dto';
import { Product } from '@product/entities/product.entity';
import { PageOptionsDto } from '@common/dtos/page-options.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //product전체 불러오기
  @Get()
  @ApiOperation({ summary: '상품조회', description: '전체상품을 조회한다' })
  // async getAllProducts(@Query('category') category?: string) {
  //   const products = await this.productService.productGetAll(category);
  //   return products;
  // }
  async getAllProducts(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('category') category?: string[],
  ): Promise<PageDto<Product>> {
    return await this.productService.getAllProducts(pageOptionsDto, category);
  }

  //product 등록하기
  @Post('/create')
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: '상품등록', description: '상품을 등록해줌' })
  @ApiResponse({
    description: 'create all products',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard) //로그인유무 확인 등록하기위해서
  async createProduct(
    @Req() req: RequestWithUserInterface,
    @Body() createProductDto: CreateProductDto,
  ) {
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
