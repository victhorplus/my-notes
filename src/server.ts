import 'dotenv/config';
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./use-cases/user/user.controller');
const notesRouter = require('./use-cases/notes/notes.controller');
const authenticateRouter = require('./use-cases/authenticate/authenticate.controller');

const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://my-notes-frontend-330b.onrender.com/',
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser('refreshToken'));

app.use('/user', userRouter);
app.use('/notes', notesRouter);
app.use('/authenticate', authenticateRouter);

app.get('/', (req, res) => {
    res.status(200).send("Hello World. Welcome to My Notes API!")
});

export function initServer(): void {
    app.listen(port, '0.0.0.0', () => {
        console.log("Servidor rodando na porta: ", port)
    });
}