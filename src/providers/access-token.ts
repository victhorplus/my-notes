import { sign } from 'jsonwebtoken';
import 'dotenv/config';

export class AccessToken {
    generate(userId: string): string {
        return sign(
            {},
            process.env.TOKEN_SECRET,
            { subject: userId, expiresIn: '1m' }
        );
    }
}