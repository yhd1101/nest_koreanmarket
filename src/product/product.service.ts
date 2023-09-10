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
    //?옵션 있어도그만없어도그만
    const queryBuilder = await this.productRepository.createQueryBuilder(
      'product',
    ); //db에 쿼리를직접 해줌
    queryBuilder.leftJoinAndSelect('product.seller', 'seller'); //관계형
    queryBuilder.leftJoinAndSelect('product.comments', 'comments'); //관계형
    if (category && category.length > 0) {
      //category에 검색키워드 이거를 검색하면 가져오겠다.
      queryBuilder.andWhere(':category = ANY(product.category)', { category });
    }
    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
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
