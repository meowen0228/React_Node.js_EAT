import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Store } from './Store';

@Entity()
export class StoreItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Store, (store) => store.id)
  @JoinColumn()
  public store: Store;

  @Column()
  public name: string;

  @Column()
  public price: number;
}
