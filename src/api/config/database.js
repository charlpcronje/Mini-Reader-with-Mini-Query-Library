import { Sequelize } from 'sequelize';
import { env } from '@src/env.js';

// Create a Sequelize instance
 const sequelize = new Sequelize(env.DB_NAME,env.DB_USER,env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: env.LOG_SQL
});

export { sequelize };