import { Request, Response, NextFunction } from 'express';
import * as CustomsTools from './CustomsTools';
import { createClient } from 'redis';
import { IToken } from '../type';

const CheckToken = async (req: Request, res: Response, next: NextFunction) => {
  const data: IToken = {
    userName: req.body.userName ? req.body.userName : req.query.userName,
    token: req.body.token ? req.body.token : req.query.token
  }
  if (!data.userName || !data.token) {
    const result = CustomsTools.CodeStatus(400, 'no token')
    return res.json(result);
  }
  
  // redis
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  const redisToken = await client.get(data.userName);

  if (redisToken !== null && redisToken === data.token) {
    next();
  } else {
    const result = CustomsTools.CodeStatus(400, 'token timeout')
    res.json(result);
  }
};

export default CheckToken;
