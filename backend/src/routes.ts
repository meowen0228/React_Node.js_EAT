import { IRouteItem } from './type';
import { UserRoutes } from './route/UserRoute';
import { StoreRoutes } from './route/StoreRoutey';
import { OrderRoutes } from './route/OrderRoutey';

export const AppRoutes: IRouteItem[] = [
  ...UserRoutes,
  ...StoreRoutes,
  ...OrderRoutes
];
