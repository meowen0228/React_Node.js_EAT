import { AppDataSource } from '../data-source';
import { Store } from '../entity/Store';
import { StoreItem } from '../entity/StoreItem';

export const showStore = async (data) => {
  console.log(data);
  const result = await AppDataSource.getRepository(Store)
    .createQueryBuilder()
    .select()
    .getMany();
  return result;
};

export const showStoreItem = async (data) => {
  console.log(data);
  const result = await AppDataSource.getRepository(StoreItem)
    .createQueryBuilder()
    .select()
    .where('StoreItem.store = :store', { store: data.id })
    .getMany();
  return result;
};
