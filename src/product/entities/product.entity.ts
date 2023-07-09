import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //model
export class Product {
  @PrimaryGeneratedColumn('uuid') //자동생성해주는 키값 uuid= 암호화
  public id: string;

  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column()
  public price: number;
}
