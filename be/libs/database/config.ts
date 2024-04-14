import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  entities: [__dirname + '/src/**/*.entity.ts'],
  migrations: ['migration/*.ts'],

  synchronize: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
