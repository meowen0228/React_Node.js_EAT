import { Request, Response } from 'express';
import * as StoreServices from '../services/StoreServices';
import * as CustomsTools from '../middleware/CustomsTools';

export const showStore = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await StoreServices.showStore(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const showStoreItem = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    console.log(data);
    const result = await StoreServices.showStoreItem(data);
    const status = CustomsTools.CodeStatus(1, 'Success', result)
    res.json(status);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};
