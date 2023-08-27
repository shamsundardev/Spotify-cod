import { Sequelize } from 'sequelize';
import { config } from '../config';

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: config.DATABASE_HOST,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

const start_db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

export { sequelize as sq, start_db };
