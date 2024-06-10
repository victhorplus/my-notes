import { Router } from "express";
import { NotesService } from "./notes.service";
import { authenticateToken } from "../../../middlewares/authenticate.middleware";
import { NotesModel } from "../classes/notes.model";

const router: Router = require('express').Router();
const notesService: NotesService = new NotesService();

router.post('/', authenticateToken, async (req, res) => {
    try{
        const { userId, content } = req.body;
        await notesService.createNote(userId, content);
        return res.status(201).json({
            success: 'Note created successfully',
            userId
        })
    }catch(error){
        return res.status(404).json({ error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try{
        const { userId } = req.body;
        const notes: NotesModel[] = await notesService.getNotes(userId);
        return res.status(200).json({data: notes})
    }catch(error){
        res.status(404).json({ error })
    }
});

router.delete('/:noteId', authenticateToken, async (req, res) => {
    try{
        const { userId } = req.body;
        const { noteId } = req.params;
        const result = await notesService.deleteNote(userId, noteId);
        res.status(201).json(result)
    }catch(error){
        res.status(404).json({ error })
    }
});

router.patch('/:noteId', authenticateToken, async (req, res) => {
    try{
        const { userId, content } = req.body;
        const { noteId } = req.params;
        const result = await notesService.updateNote(userId, noteId, content);
        res.status(201).json(result);
    }catch(error){
        res.status(404).json({ error })
    }
});

module.exports = router;