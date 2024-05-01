import 'dotenv/config';
import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

export const sequelize: Sequelize = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword,
    {
        dialect: "postgres",
        host: dbHost,
        dialectOptions: {
            ssl:{
                require: true
            }
        }
    }
);