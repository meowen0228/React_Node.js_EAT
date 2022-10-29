import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './Order';
import { StoreItem } from './StoreItem';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  public order: Order;

  @ManyToOne(() => StoreItem, (storeItem) => storeItem.id, { nullable: false })
  @JoinColumn()
  public storeItem: StoreItem;

  @Column()
  public qty: number;
}
