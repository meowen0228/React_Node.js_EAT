import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { AppRoutes } from './routes';
import { Request, Response, NextFunction } from 'express';
import CheckToken from './middleware/CheckToken';
import CreateSaltPassword from './middleware/CreateSaltPassword';

dotenv.config();

const port = process.env.PORT || '3001';

// establish database connection
AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // create and setup express app
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());

    // cors
    const whitelist = ['http://localhost:3001', 'http://localhost:3030', 'http://localhost:3030/'];
    const corsOptions = {
      origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    };
    app.use(cors(corsOptions));

    // SHA256
    const SHA256 = (routePath: string[], middleware) => {
      return (req: Request, res: Response, next: NextFunction) => {
        if (routePath.includes(req.path)) {
          return middleware(req, res, next);
        } else {
          console.log(req.path);
          return next();
        }
      };
    };
    const SHA256List = [
      '/api/v1/login',
      '/api/v1/addUser',
    ];
    app.use(SHA256(SHA256List, CreateSaltPassword));

    // token 驗證 排除的
    const unless = (routePath: string[], middleware) => {
      return (req: Request, res: Response, next: NextFunction) => {
        if (routePath.includes(req.path)) {
          console.log(req.path);
          return next();
        } else {
          return middleware(req, res, next);
        }
      };
    };
    const unlessList = [
      '/api/v1/login',
      '/api/v1/addUser',
      '/api/v1/checkUserName',
      '/api/v1/checkEmail',
    ];
    app.use(unless(unlessList, CheckToken));

    // register routes
    AppRoutes.forEach((route) => {
      app[route.method](route.path, ...route.middlewares);
    });

    // start express server
    app.listen(port);
  })
  .catch((error) => console.log(error));
