import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Comment extends CommonEntity {
  //누가 적을건지, 어디에 적을건지(대상자) 어떤 게시물, 어떤내용을 할것인지
  @Column()
  public desc: string; //내용

  @ManyToOne(() => User, (user: User) => user.comments) //누가 적을건지
  @JoinColumn()
  public user: User;

  @ManyToOne(() => Product, (product: Product) => product.comments)
  @JoinColumn()
  public product: Product; //대상자 어디에 댓글을 달건지.
}
