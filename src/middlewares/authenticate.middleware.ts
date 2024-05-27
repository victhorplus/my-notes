import { verify } from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    const { headers } = req;
    const token = headers.authorization.split(" ")[1];
    try{
        var { sub } = verify(token, process.env.TOKEN_SECRET);
        req.body.userId = sub;
        next();
    }catch(err){
        res.status(403).json({
            error: 'Token inválido'
        })
    }
}