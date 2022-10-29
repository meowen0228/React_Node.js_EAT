import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';
import * as CustomsTools from '../middleware/CustomsTools';

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserServices.login(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    const status = CustomsTools.CodeStatus(0, 'userName or password')
    console.log(err.message);
    res.json(status);
  }
};

export const checkUserName = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserServices.checkUserName(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    const status = CustomsTools.CodeStatus(0, 'userName or password')
    console.log(err.message);
    res.json(status);
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserServices.checkEmail(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    const status = CustomsTools.CodeStatus(0, 'userName or password')
    console.log(err.message);
    res.json(status);
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await UserServices.addUser(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    console.log(data);
    const result = await UserServices.getUser(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    console.log(data);
    const result = await UserServices.updateUser(data);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};
