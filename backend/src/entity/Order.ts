import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Store } from './Store';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Store, (store) => store.id)
  public store: Store;

  @Column()
  public phone: string;

  @Column()
  public deliveryAddress: string;

  @CreateDateColumn({ type: 'timestamptz' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated: Date;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  public user: User;
}
