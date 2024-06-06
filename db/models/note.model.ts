import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../setup';
import { NotesModel } from '../../src/modules/notes/classes/notes.model';
import { User } from './user.model';

interface NotesCreationAttributes extends Optional<NotesModel, 'id'> {}
interface NotesInstance extends Model<NotesModel, NotesCreationAttributes>, NotesModel {
    createdAt?: Date;
    updatedAt?: Date;
}

export const Note = sequelize.define<NotesInstance>(
    'Note',
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);

Note.belongsTo(User, { foreignKey: 'userId' });