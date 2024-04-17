import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const createDataSource = async (): Promise<DataSource> => {
  const configService = new ConfigService();

  const dataSource = new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
  });

  return dataSource;
};
