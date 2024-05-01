import { DataTypes } from 'sequelize';
import { sequelize } from '../setup';

export const Note = sequelize.define(
    'Note',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);