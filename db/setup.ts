// const { Sequelize } = require('sequelize');
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize: Sequelize = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword,
    {   
        // ssl: true,
        dialect: "postgres",
        host: dbHost,
        dialectOptions: {
            ssl:{
                require: true
            }
        }
    }
);

export default sequelize;

async function teste() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

teste();