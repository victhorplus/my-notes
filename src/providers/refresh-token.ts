import { Token } from "../../db/models";
import { TokenModel } from "../classes";

export class RefreshToken {
    async generate(userId:string): Promise<TokenModel> {
        const tomorrowTime: number = new Date().setDate(new Date().getDate() + 1);
        const twoMinutesTime: number = new Date().getTime()+120000;
        const result = await Token.create({ 
            userId,
            expiresIn: tomorrowTime
         });
        return result.dataValues
    }

    getCookieOptions(){
        return {
            httpOnly: true,
            secure: false, 
            sameSite: 'Lax',
            path: '/',
        }
    }
}