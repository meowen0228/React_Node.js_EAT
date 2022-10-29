import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public phone: string;

  @Column()
  public address: string;
}
