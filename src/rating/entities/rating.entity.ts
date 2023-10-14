import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '@common/entities/common.entity';
import { User } from '@users/entities/user.entity';
@Entity()
export class Rating extends CommonEntity {
  @ManyToMany(() => User, (user: User) => user.rating)
  @JoinColumn()
  public buyer: User;

  @Column({
    default: 1,
  })
  public rating: number;
}
