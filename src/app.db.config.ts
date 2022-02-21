import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [path.join(__dirname, '**', '**/**/*.entity.js')],
    synchronize: false,
    migrations: [path.join(__dirname, '**', 'migration/*.ts')],
    logging: false,
    logger: 'advanced-console',
  };
}
