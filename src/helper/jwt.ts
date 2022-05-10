import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ThrowToRequestException } from '../exceptions/ThrowToRequestException';
import { getSession } from '../model/session';

/**
 * Checks is a JWT is set and whether it is valid. If valid,
 * we return the JWT object. This is used for routes that don't
 * require you be logged in to use, but if you are logged in may
 * act differently. For example, the `POST /user` route can be
 * called by a provider who is logged in, which gives them
 * ownership over the newly created user.
 * 
 * @param cxt 
 * @returns 
 */
export function checkForJwt(cxt: Koa.Context) {
    try {
        const rawToken = getJwtFromHeaders(cxt.request.headers.authorization);

        return jwt.verify(rawToken, config.APP_JWT_SECRET);
    } catch (e) {
        return null;
    }
}

/**
 * 
 * @param sessionId 
 * @param userId 
 * @param userLocale 
 * @param hours 
 * @returns 
 */
export function generateJwt(
    sessionId: string,
    userId: string,
    userLocale: string = config.DEFAULT_LOCALE,
    hours = 24
): Promise<string> {
    return jwt.sign(
        {
            id: sessionId,
            userId: userId,
            locale: userLocale
        },
        config.APP_JWT_SECRET,
        {
            expiresIn: 60 * 60 * hours
        }
    );
}

/**
 * Get the JWT
 * 
 * @param authHeader 
 * @returns string
 */
export function getJwtFromHeaders(authHeader: string): string {
    return authHeader.split(' ')[1];
}

/**
 * Verify's a JWT's signature and returns the decoded payload.
 * 
 * @param cxt 
 * @returns 
 */
export async function verifyAndDecodeJwt(cxt: Koa.Context): Promise<any> {
    const rawToken = getJwtFromHeaders(cxt.request.headers.authorization);

    const verify = jwt.verify(rawToken, config.APP_JWT_SECRET);

    const session = await getSession(verify.id);
    if (session.user_id !== verify.userId || !session.is_active) {
        throw new ThrowToRequestException('E0002');
    }

    return verify;
}
