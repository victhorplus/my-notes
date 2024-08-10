import { where } from "sequelize";
import { Token } from "../../../db/models";
import { TokenModel } from "../../classes";
import { AccessToken, RefreshToken } from "../../providers";

export class RefreshTokenService {
    accessToken: AccessToken;
    refresToken: RefreshToken;

    constructor(){
        this.accessToken = new AccessToken();
        this.refresToken = new RefreshToken();
    }

    async execute(tokenId: number): Promise<{ refreshToken; accessToken? }> {
        const currentTime = new Date().getTime();
        const res = await Token.findByPk(tokenId);

        if(!res) throw "Refresh token não encontrado";
        const matchToken = res.dataValues;
        console.log("matchToken: ", matchToken)

        const accessToken = await this.accessToken.generate(matchToken.userId)
        if(matchToken.expiresIn > currentTime){
            return {
                accessToken,
                refreshToken: matchToken.id
            }
        }
        
        const newRefreshToken = await this.refresToken.generate(matchToken.userId);
        await Token.destroy({
            where: { id: matchToken.id }
        });

        return {
            accessToken,
            refreshToken: newRefreshToken
        }
    }
}