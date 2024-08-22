import { hash, compare } from 'bcryptjs';
import { TokenModel, UserModel } from '../../classes';
import { User } from '../../../db/models';
import { AccessToken, RefreshToken } from '../../providers';

export class UserService {
    accessToken: AccessToken;
    refresToken: RefreshToken;

    constructor(){
        this.accessToken = new AccessToken();
        this.refresToken = new RefreshToken();
    }

    async createUser(user: UserModel): Promise<UserModel> {
        const { nome, email, password } = user;
        const { dataValues: userMatch } = await User.findOne({
            where: { email }
        });

        if(userMatch){ throw "Email already in use" }

        const { dataValues: newUser } = await User.create({
            nome,
            email,
            password: await hash(password, 8)
        });
        delete newUser.password;
        
        return newUser;
    }

    async deleteUser(id: string): Promise<number> {
        const { dataValues: userMatch } = await User.findOne({
            where: { id }
        });
        
        if(!userMatch){ throw "User not found" }

        return await User.destroy({
            where: { id }
        });
    }

    async authenticate(email: string, password): Promise<{ userMatch: UserModel, accessToken: string, refreshToke: TokenModel }> {
        const { dataValues: userMatch } = await User.findOne({
            where: { email }
        });
        console.log("USER MATCH", userMatch)
        if(!userMatch) { throw new Error("Email or password invalid") }
    
        const isPasswordMatch: boolean = await compare(password, userMatch.password);
        if(!isPasswordMatch) { throw new Error("Email or password invalid") }

        delete userMatch.password;
        const accessToken: string = this.accessToken.generate(userMatch.id);
        const refreshToke: TokenModel = await this.refresToken.generate(userMatch.id);

        return { userMatch, accessToken, refreshToke }
    }
}