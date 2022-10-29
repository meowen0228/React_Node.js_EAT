import { IRouteItem } from '../type';
import * as StoreController from '../controller/StoreController';

export const StoreRoutes: IRouteItem[] = [
  {
    path: '/api/v1/showStore',
    method: 'get',
    middlewares: [
      StoreController.showStore,
    ],
  },
  {
    path: '/api/v1/showStoreItem',
    method: 'get',
    middlewares: [
      StoreController.showStoreItem,
    ],
  },
];
