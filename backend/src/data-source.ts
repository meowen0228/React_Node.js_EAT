import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/entity/*.ts'],
  migrations: ['src/seed/*.ts'],
  subscribers: [],
});
