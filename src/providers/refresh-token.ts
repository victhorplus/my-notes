import { Token } from "../../db/models";
import { TokenModel } from "../classes";

export class RefreshToken {
    async generate(userId:string): Promise<TokenModel> {
        // const tomorrowTime: number = new Date().setDate(new Date().getDate() + 1);
        const tomorrowTime: number = new Date().setMinutes(new Date().getMinutes() + 10)
        const result = await Token.create({ 
            userId,
            expiresIn: tomorrowTime
         });
        return result.dataValues
    }
}