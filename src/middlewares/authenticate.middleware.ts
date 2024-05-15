import { verify } from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    const { headers } = req;
    const token = headers.authorization.split(" ")[1];
    const { sub } = verify(token, process.env.TOKEN_SECRET);
    req.body.userId = sub;
    next();
}