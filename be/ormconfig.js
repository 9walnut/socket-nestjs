"use strict";
// import { ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// export const createDataSource = async (): Promise<DataSource> => {
//   const configService = new ConfigService();
//   const dataSource = new DataSource({
//     type: 'mysql',
//     host: configService.get('DB_HOST'),
//     port: configService.get<number>('DB_PORT'),
//     username: configService.get('DB_USERNAME'),
//     password: configService.get('DB_PASSWORD'),
//     database: configService.get('DB_DATABASE'),
//     synchronize: false,
//     entities: ['src/**/*.entity.ts'],
//     migrations: ['src/database/migrations/*.ts'],
//     migrationsTableName: 'migrations',
//   });
//   return dataSource;
// };
// export const dataSourceInstance = createDataSource();
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1q2w3e4r!',
    database: 'socket',
    synchronize: false,
    entities: ['src/**/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
});
