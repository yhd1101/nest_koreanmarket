import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //등록해주는 로직
  async productCreate(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  //전체불러오는 로직
  async productGetAll() {
    const products = await this.productRepository.find();
    return { count: products.length, products };
  }

  async productGetById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      // id가 없을때 만들어줌
      throw new HttpException('No id', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async productDeleteById(id: string) {
    await this.productRepository.delete({ id });
    return 'deleted product';
  }
  async productUpdateById(id: string, createProductDto: CreateProductDto) {
    // const product = await this.productRepository.findOneBy({ id });
    // const updateProduct = await this.productRepository.update(createProductDto);
    // return updateProduct;
    await this.productRepository.update(id, createProductDto);
    return 'updated product';
  }
}
