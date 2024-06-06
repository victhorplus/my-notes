import { Router } from "express";
import { NotesService } from "./notes.service";
import { authenticateToken } from "../../../middlewares/authenticate.middleware";

const router: Router = require('express').Router();
const notesService: NotesService = new NotesService();

router.get('/', (req, res) => {
    res.send("Bem vindo as notas");
});

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
})

module.exports = router;