import { DataTypes } from "sequelize";
import { sequelize } from "../setup";
import { User } from './user.model';

export const Token = sequelize.define(
    "Token",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiresIn: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }
)

Token.belongsTo(User, { foreignKey: 'userId' });