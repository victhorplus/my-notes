import { compare } from 'bcryptjs';
import { Token, User } from "../../../db/models";
import { TokenModel, UserModel } from "../../classes";
import { AccessToken, RefreshToken } from "../../providers";

export class AuthenticateService {
    accessToken: AccessToken;
    refreshToken: RefreshToken;

    constructor(){
        this.accessToken = new AccessToken();
        this.refreshToken = new RefreshToken();
    }

    async authenticate(email: string, password): Promise<{ user: UserModel; accessToken: string; refreshToken: TokenModel; cookieOptions }> {
        const userMatch = (await User.findOne({
            where: { email }
        }))?.dataValues;
        if(!userMatch) { throw new Error("Email or password invalid") }
    
        const isPasswordMatch: boolean = await compare(password, userMatch.password);
        if(!isPasswordMatch) { throw new Error("Email or password invalid") }

        delete userMatch.password;
        const accessToken: string = this.accessToken.generate(userMatch.id);
        const refreshToken: TokenModel = await this.refreshToken.generate(userMatch.id);
        const cookieOptions = this.refreshToken.getCookieOptions();

        return { 
            user: userMatch, 
            accessToken, 
            refreshToken,
            cookieOptions
        }
    }

    async renewRefreshToken(tokenId: TokenModel['id']): Promise<{ refreshToken; accessToken; cookieOptions }> {
        const matchRefreshToken: TokenModel = (await Token.findByPk(tokenId))?.dataValues;

        if(!matchRefreshToken) { throw new Error("Refresh token não encontrado"); }
        
        const accessToken = await this.accessToken.generate(matchRefreshToken.userId);
        const cookieOptions = this.refreshToken.getCookieOptions();
        const currentTime = new Date().getTime();

        if(matchRefreshToken.expiresIn > currentTime){
            return {
                accessToken,
                refreshToken: matchRefreshToken,
                cookieOptions
            }
        }
        
        const newRefreshToken = await this.refreshToken.generate(matchRefreshToken.userId);
        await Token.destroy({
            where: { id: matchRefreshToken.id }
        });

        return {
            accessToken,
            refreshToken: newRefreshToken,
            cookieOptions
        }
    }
}