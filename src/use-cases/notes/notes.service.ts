import { Op } from 'sequelize';
import { Note } from '../../../db/models/note.model';
import { NotesModel, INotesParams } from '../../classes';

export class NotesService {
    createNote(note: NotesModel): Promise<NotesModel> {
        return Note.create(note)
    }

    getNotes(userId: string, params?: INotesParams): Promise<NotesModel[]>{
        return Note.findAll({
            where: { 
                [Op.and]: [
                    { userId },
                    { title: { [Op.substring]: params.title || '' }}
                ]
            }
        }).catch(error => {
            console.error(error);
            return error
        });
    }

    async deleteNote(userId, noteId): Promise<number> {
        const matchNote = await Note.findByPk(noteId);
        if(!matchNote){
            throw 'Nenhuma nota encontrada';
        }
        if(matchNote.userId != userId){
            throw 'Requisição inválida - Nota não pertence ao usuário';
        }
        return Note.destroy({
            where: { id: noteId }
        });
    }

    async updateNote(updatedNote: NotesModel): Promise<[affectedCount: number]> {
        const matchNote = await Note.findByPk(updatedNote.id);
        if(!matchNote){
            throw 'Nenhuma nota encontrada';
        }

        return Note.update(updatedNote, { 
            where: { id: updatedNote.id }
        });
    }
}