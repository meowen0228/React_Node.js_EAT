import { Request, Response } from 'express';
import * as OrderServices from '../services/OrderServices';
import * as CustomsTools from '../middleware/CustomsTools';

export const showOrder = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    console.log(data);
    const result = await OrderServices.showOrder(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const showOrderDetail = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    console.log(data);
    const result = await OrderServices.showOrderDetail(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    console.log(data);
    const result = await OrderServices.createOrder(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    console.log(data);
    const result = await OrderServices.updateOrder(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await OrderServices.deleteOrder(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};
