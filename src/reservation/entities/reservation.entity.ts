import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Reservation extends CommonEntity {
  @Column()
  public location: string;

  @OneToOne(() => Product, (product: Product) => product.Reservation)
  public product: Product;

  @Column({
    default: true,
  })
  public purchase: boolean;

  @ManyToOne(() => User, (user: User) => user.reservation)
  public user: User;

  @Column()
  public desc: string;
}
