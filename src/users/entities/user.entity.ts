import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../common/entities/common.entity';

@Entity()
export class User extends CommonEntity {
  @Column()
  public name: string;
  @Column()
  public email: string;
  @Column()
  public password: string;
}
