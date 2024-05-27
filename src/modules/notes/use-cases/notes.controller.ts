import { Router } from "express";

const router: Router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bem vindo as notas");
});

module.exports = router;