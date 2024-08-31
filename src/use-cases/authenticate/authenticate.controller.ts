import * as express from "express";
import { AuthenticateService } from "./authenticate.service";

const router = express.Router();

const authenticateService = new AuthenticateService();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try{
        const { user, accessToken, refreshToken, cookieOptions } = await authenticateService.authenticate(email, password);
        
        res.cookie('refreshToken', refreshToken.id, cookieOptions);
        res.status(201).json({
            user,
            accessToken
        });
    }catch(error){
        res.status(401).json({ error: error.message })
    }
});

router.post('/refresh-token', async (req, res) => {
    try{
        const reqRefreshToken = req.cookies.refreshToken;
        const { refreshToken, accessToken, cookieOptions } = await authenticateService.renewRefreshToken(reqRefreshToken);

        res.cookie('refreshToken', refreshToken.id, cookieOptions);
        res.status(200).json({ accessToken });
    }catch(error){
        res.status(401).json({ error: error.message })
    }
});

module.exports = router;