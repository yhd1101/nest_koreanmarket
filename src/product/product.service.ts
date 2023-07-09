import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //등록해주는 로직
  async productCreate(name: string, desc: string, price: number) {
    const newProduct = await this.productRepository.create({
      name,
      desc,
      price,
    });
    await this.productRepository.save(newProduct);
    return newProduct;
  }
}
