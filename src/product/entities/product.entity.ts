import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity() //model
export class Product extends CommonEntity {
  @Column()
  public name: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  public desc?: string[];

  @Column()
  public price: number;

  @Column('text', {
    //text형태로 넣어줘야함 ex) number, object등있다.
    array: true,
  })
  public productImg: string[];

  @Column('text', {
    array: true,
  })
  public category: string[];

  @Column()
  public region: string;

  @Column({
    default: true,
  })
  public isSelling: boolean;

  @Column()
  public brand: string;

  @ManyToOne(() => User, (user: User) => user.products)
  @JoinColumn()
  public seller: User;

  @OneToMany(() => Comment, (comment: Comment) => comment.product)
  public comments: Comment[];
}
