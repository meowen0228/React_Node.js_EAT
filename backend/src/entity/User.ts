import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userName'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userName: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public phone: string;

  @Column({ nullable: true })
  public city: string;

  @Column('smallint', { nullable: true })
  public age: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated: Date;
}
