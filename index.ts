import { Sequelize } from 'sequelize';
import { sequelize } from './db'

initDatabase();

async function initDatabase(): Promise<Sequelize> {
    return await sequelize.sync()
        .then((value) => {
            console.log("Database connected successfully");
            return value;
        })
        .catch(err => {
            console.log("Unable to connect to the database:", err);
            return err;
        })
}