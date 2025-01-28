import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

ConfigModule.forRoot();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  seeds: ['dist/db/seeds/*.js'],
  factories: ['dist/db/factories/*.js'],
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['dist/**/entities/*.js'],
};

export const appDataSource = new DataSource(dataSourceOptions);
