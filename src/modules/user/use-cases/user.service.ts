import { User } from '../../../../db';
import { UserModel } from '../classes';
import { hash } from 'bcryptjs';

export class UserService {
    async createUser(user: UserModel): Promise<UserModel> {
        const { nome, email, password } = user;

        const isMatchUser = await User.findOne({
            where: { email: email }
        });
        
        if(isMatchUser){ throw "Email already in use" }

        const result: UserModel = await User.create<any, any>({
            nome,
            email,
            password: await hash(password, 8)
        });

        delete result?.password;
        return result;
    }
}