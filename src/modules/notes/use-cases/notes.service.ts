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
}