import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Order } from '../entity/Order';
import { OrderDetail } from '../entity/OrderDetail';
import { Store } from '../entity/Store';
import { StoreItem } from '../entity/StoreItem';

export class seed166311978972b implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          userName: 'Saw',
          password: '123456',
          email: 'Saw@gmail.com',
          phone: '0912345678',
          city: '高雄',
          age: 23,
        },
        {
          userName: 'Timber',
          password: '123456',
          email: 'Timber@yahoo.com',
          phone: '0956781234',
          city: '高雄',
          age: 65,
        },
        {
          userName: '=w=',
          password: '123456',
          email: '=w=@yahoo.com',
          phone: '0981256734',
          city: '高雄',
          age: 32,
        },
      ])
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Store)
      .values([
        { name: '便當店', phone: 'phone1', address: 'address1' },
        { name: '滷味', phone: 'phone2', address: 'address2' },
        { name: '自助餐', phone: 'phone3', address: 'address3' },
        { name: '飲料店', phone: 'phone4', address: 'address4' },
        { name: '麥當勞', phone: 'phone5', address: 'address5' },
      ])
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(StoreItem)
      .values([
        { store: { id: 1 }, name: '高級便當', price: 200 },
        { store: { id: 1 }, name: '普通便當', price: 100 },
        { store: { id: 2 }, name: 'A套餐', price: 150 },
        { store: { id: 2 }, name: 'B套餐', price: 130 },
        { store: { id: 2 }, name: 'C套餐', price: 100 },
        { store: { id: 3 }, name: '便當', price: 70 },
        { store: { id: 4 }, name: '紅茶', price: 25 },
        { store: { id: 4 }, name: '珍珠奶茶', price: 50 },
        { store: { id: 5 }, name: '麥香魚套餐', price: 120 },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
