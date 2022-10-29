import * as HttpService from './HttpService';

// eslint-disable-next-line import/prefer-default-export
export const Login = (param) => HttpService.post('/login', param);
export const CheckUserName = (param) => HttpService.post('/checkUserName', param);
export const CheckEmail = (param) => HttpService.post('/checkEmail', param);
export const AddUser = (param) => HttpService.post('/addUser', param);
export const GetUser = (param) => HttpService.get('/getUser', param);
export const UpdateUser = (param) => HttpService.put('/updateUser', param);

export const ShowStore = (param) => HttpService.get('/showStore', param);
export const ShowStoreItem = (param) => HttpService.get('/showStoreItem', param);

export const ShowOrder = (param) => HttpService.get('/showOrder', param);
export const ShowOrderDetail = (param) => HttpService.get('/showOrderDetail', param);
export const CreateOrder = (param) => HttpService.post('/createOrder', param);
export const UpdateOrder = (param) => HttpService.put('/updateOrder', param);
export const DeleteOrder = (param) => HttpService.del('/deleteOrder', param);
