import * as express from "express";
import { RefreshTokenService } from "./refresh-token.service";

const router = express.Router();
const refreshTokenService = new RefreshTokenService();

router.get('/', async (req, res) => {
    try{
        const { refreshToken } = req.body;
        const result = await refreshTokenService.execute(refreshToken);
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
});

module.exports = router;