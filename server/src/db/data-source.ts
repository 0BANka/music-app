import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  seeds: ['dist/db/seeds/*.js'],
  factories: ['dist/db/factories/*.js'],
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1111',
  database: 'ajs19_arthur',
  synchronize: false,
  logging: true,
  entities: ['dist/**/entities/*.js'],
};

export const appDataSource = new DataSource(dataSourceOptions);
