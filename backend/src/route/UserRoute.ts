import { IRouteItem } from '../type';
import * as UserController from '../controller/UserController';

export const UserRoutes: IRouteItem[] = [
  {
    path: '/api/v1/login',
    method: 'post',
    middlewares: [
      UserController.login,
    ],
  },
  {
    path: '/api/v1/checkUserName',
    method: 'post',
    middlewares: [UserController.checkUserName],
  },
  {
    path: '/api/v1/checkEmail',
    method: 'post',
    middlewares: [UserController.checkEmail],
  },
  {
    path: '/api/v1/addUser',
    method: 'post',
    middlewares: [UserController.addUser],
  },
  {
    path: '/api/v1/getUser',
    method: 'get',
    middlewares: [UserController.getUser],
  },
  {
    path: '/api/v1/updateUser',
    method: 'put',
    middlewares: [UserController.updateUser],
  },
];
