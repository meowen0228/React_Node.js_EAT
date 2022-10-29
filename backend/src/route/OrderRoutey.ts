import { IRouteItem } from '../type';
import * as OrderController from '../controller/OrderController';

export const OrderRoutes: IRouteItem[] = [
  {
    path: '/api/v1/showOrder',
    method: 'get',
    middlewares: [
      OrderController.showOrder,
    ],
  },
  {
    path: '/api/v1/showOrderDetail',
    method: 'get',
    middlewares: [
      OrderController.showOrderDetail,
    ],
  },
  {
    path: '/api/v1/createOrder',
    method: 'post',
    middlewares: [
      OrderController.createOrder,
    ],
  },
  {
    path: '/api/v1/updateOrder',
    method: 'put',
    middlewares: [OrderController.updateOrder],
  },
  {
    path: '/api/v1/deleteOrder',
    method: 'delete',
    middlewares: [OrderController.deleteOrder],
  },
];
