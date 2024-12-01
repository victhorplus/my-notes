import { Router } from "express";
import { authenticateToken } from "../../middlewares/authenticate.middleware";
import { INotesParams, NotesModel } from "../../classes";
import { NotesService } from "./notes.service";

const router: Router = require('express').Router();
const notesService: NotesService = new NotesService();

router.post('/', authenticateToken, async (req, res) => {
    try{
        const note: NotesModel = req.body;

        const result = await notesService.createNote(note);
        return res.status(201).json(result)
    }catch(error){
        return res.status(404).json({ error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try{
        const { userId } = req.body;
        const params: INotesParams = req.query;

        const notes: NotesModel[] = await notesService.getNotes(userId, params);
        return res.status(200).json({data: notes})
    }catch(error){
        res.status(404).json({ error })
    }
});

router.delete('/:noteId', authenticateToken, async (req, res) => {
    try{
        const { userId } = req.body;
        const { noteId } = req.params;

        await notesService.deleteNote(userId, noteId);
        res.status(201).json({ id: noteId });
    }catch(error){
        res.status(404).json({ error })
    }
});

router.put('/:noteId', authenticateToken, async (req, res) => {
    try{
        const note: NotesModel = req.body;
        const { noteId } = req.params;
        note.id = noteId;

        await notesService.updateNote(note);
        res.status(201).json(note);
    }catch(error){
        res.status(404).json({ error })
    }
});

module.exports = router;