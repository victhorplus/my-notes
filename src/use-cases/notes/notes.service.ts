import { Note } from '../../../db/models/note.model';
import { NotesModel } from '../../classes/notes.model';

export class NotesService {
    createNote(userId: string, content: string): Promise<NotesModel> {
        return Note.create(
            {
                userId,
                content
            }
        )
    }

    getNotes(userId: string): Promise<NotesModel[]>{
        return Note.findAll({
            where: { userId }
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

    async updateNote(userId: string, noteId: string, newContent: string): Promise<[affectedCount: number]> {
        const matchNote = await Note.findByPk(noteId);
        if(!matchNote){
            throw 'Nenhuma nota encontrada';
        }
        if(matchNote.userId != userId){
            throw 'Requisição inválida - Nota não pertence ao usuário';
        }
        return Note.update(
            { content: newContent },  
            { where: { id: noteId }}
        )
    }
}