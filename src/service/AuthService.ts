import { generateJwt } from '../helper/jwt';
import { IUser } from '../interface/model';

/**
 * @param user 
 * @returns JWT token
 */
export async function createSession(user: IUser): Promise<string> {
    // TODO: You'll need to add your session logic here
    const sessionId = '...';

    // ...

    return await generateJwt(sessionId, user.id, user.locale, 24);
}