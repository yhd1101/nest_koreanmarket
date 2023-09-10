import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //등록해주는 로직
  async productCreate(createProductDto: CreateProductDto, user: User) {
    const newProduct = await this.productRepository.create({
      ...createProductDto,
      seller: user,
    });
    console.log(newProduct);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  //전체불러오는 로직
  async productGetAll(category?: string) {
    // const products = await this.productRepository.find();
    // return { count: products.length, products };
    const queryBuilder = await this.productRepository.createQueryBuilder(
      'product',
    );
    // queryBuilder.leftJoinAndSelect('product.user', 'user');
    queryBuilder.leftJoinAndSelect('product.comments', 'comments');
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
    // if (category && category.length > 0) {
    //   queryBuilder.where('product.category IN (:...category)', { category });
    // }
    // return queryBuilder;
    // if (category) {
    //   return await this.productRepository.findOneBy({ category });
    // } else {
    //   return await this.productRepository.find({
    //     relations: ['seller', 'comments'], //누가 올렸는지 알기위해서
    //   });
    // }
  }

  async productGetById(id: string) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.seller', 'seller')
      .leftJoinAndSelect('product.comments', 'comments')
      .where('product.id = :id', { id })
      .getOne();
    // const product = await this.productRepository.findOneBy({
    //   where: { id },
    //   relations: {
    //     seller: true,
    //   },
    // });
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
