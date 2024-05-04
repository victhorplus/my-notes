import { User } from '../../../../db';
import { UserModel } from '../classes';
import { hash } from 'bcryptjs';

export class UserService {
    async createUser(user: UserModel): Promise<UserModel> {
        const { nome, email, password } = user;

        const isMatchUser = await User.findOne({
            where: { email }
        });

        if(isMatchUser){ throw "Email already in use" }

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
        const isMatchUser = await User.findOne({
            where: { id }
        });
        if(!isMatchUser){ throw "User not found" }

        return await User.destroy({
            where: { id }
        });
    }

    drop(){
        User.drop();
    }
}