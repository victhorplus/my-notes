import { Note } from '../../../../db/models/note.model';
import { NotesModel } from '../classes/notes.model';

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

    async deleteNotes(userId, noteId): Promise<any> {
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
}