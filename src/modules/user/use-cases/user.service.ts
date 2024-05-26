import { User } from '../../../../db';
import { UserModel } from '../classes/user.model';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class UserService {
    async createUser(user: UserModel): Promise<UserModel> {
        const { nome, email, password } = user;

        const userMatch = await User.findOne({
            where: { email }
        });
        if(userMatch){ throw "Email already in use" }

        const result = await User.create<any, any>({
            nome,
            email,
            password: await hash(password, 8)
        });
        const newUser: UserModel = result.dataValues;

        delete newUser.password;
        return newUser;
    }

    async deleteUser(id: string): Promise<number> {
        const userMatch = await User.findOne({
            where: { id }
        });
        if(!userMatch){ throw "User not found" }

        return await User.destroy({
            where: { id }
        });
    }

    async authenticate(email: string, password): Promise<{ token: string }> {
        const { dataValues: userMatch }: { dataValues: UserModel } = await User.findOne({
            where: { email }
        });
        if(!userMatch) { throw new Error("Email or password invalid") }
    
        const isPasswordMatch: boolean = await compare(password, userMatch.password);
        if(!isPasswordMatch) { throw new Error("Email or password invalid") }
        const token = sign(
            {},
            process.env.TOKEN_SECRET,
            {
                subject: userMatch.id,
                expiresIn: "1 days"
            }
        );
        return { token }
    }

    drop(){
        User.drop();
    }
}