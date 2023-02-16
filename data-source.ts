import { DataSource } from "typeorm";
import * as process from "process";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['TYPEORM_HOST'],
  port: parseInt(process.env['TYPEORM_PORT']),
  username: process.env['TYPEORM_USERNAME'],
  password: process.env['TYPEORM_PASSWORD'],
  database: process.env['TYPEORM_DATABASE'],
  // dropSchema: true,
  // synchronize: true,
  logging: process.env['TYPEORM_LOGGING'] === 'true' ? 'all' : false,
  entities: [
    'dist/**/*.entity.js'
  ],
  migrations: [
    'dist/migration/*.js'
  ],
});
