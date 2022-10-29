import { AppDataSource } from '../data-source';
import { Order } from '../entity/Order';
import { OrderDetail } from '../entity/OrderDetail';

export const showOrder = async (data) => {
  console.log(data);
  const id = data.id
  const result = await AppDataSource.getRepository(Order)
    .createQueryBuilder()
    .select()
    .where('Order.user = :id', { id: id })
    .getMany();
  return result;
};

export const showOrderDetail = async (data) => {
  console.log(data);
  const orderId = data.orderId
  const result = await AppDataSource.getRepository(OrderDetail)
    .createQueryBuilder()
    .select()
    .leftJoinAndSelect('OrderDetail.storeItem', 'storeItem')
    .where('OrderDetail.order = :id', { id: orderId })
    .getMany();
  return result;
};

export const createOrder = async (data) => {
  return await AppDataSource.manager
    .transaction(async (transactionalEntityManager) => {
      console.log(data);
      const order = data.order;
      const orderResult = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Order)
        .values([order])
        .execute();
      const newOrderID = orderResult.identifiers[0].id;

      const orderDetail = data.detail;
      orderDetail.forEach((element) => {
        element.order = { id: newOrderID };
      });
      const orderDetailResult = await AppDataSource.createQueryBuilder()
        .insert()
        .into(OrderDetail)
        .values(orderDetail)
        .execute();

      const newOrderDetailID = orderDetailResult.identifiers;
      const result = {
        OrderID: newOrderID,
        OrderDetail: newOrderDetailID,
      };
      return result;
    })
    .then((x) => {
      return x;
    });
};

export const updateOrder = async (data) => {
  return await AppDataSource.manager
    .transaction(async (transactionalEntityManager) => {
      console.log(data);
      const orderId = data.orderId;
      await AppDataSource.createQueryBuilder()
        .delete()
        .from(OrderDetail)
        .where('orderId = :id', { id: orderId })
        .execute();

      const orderDetail = data.detail;
      orderDetail.forEach((element) => {
        element.order = { id: orderId };
      });
      const orderDetailResult = await AppDataSource.createQueryBuilder()
        .insert()
        .into(OrderDetail)
        .values(orderDetail)
        .execute();
      const result = {
        OrderDetail: orderDetailResult.identifiers,
      };
      return result;
    })
    .then((x) => {
      return x;
    });
};

export const deleteOrder = async (data) => {
  console.log(data);
  const orderId = data.orderId;
  const result = await AppDataSource.createQueryBuilder()
    .delete()
    .from(Order)
    .where('id = :id', { id: orderId })
    .execute();
  return result;
};
