import * as Koa from 'koa';
import { ThrowToRequestException } from '../exception/ThrowToRequestException';
import { ThrowValidationException } from '../exception/ThrowValidationException';
import { respond, respondError } from '../helper/http';
import { validateInput } from '../helper/validate';
import { IUser } from '../interface/model';
import * as AuthService from '../service/AuthService';

/**
 * Accepts a "x-api-key" header.
 * Header is formatted at "API_KEY_ID:API_KEY_SECRET"
 * 
 * @param ctx 
 */
export async function login(ctx: Koa.Context): Promise<void> {
    try {
        // Input validation example...
        // @link https://www.npmjs.com/package/node-input-validator#rules
        // const validatationErrorsFound = await validateInput(
        //     ctx.request.body,
        //     {
        //         "rule1": "required",
        //         "rule2": "required"
        //     }
        // );
        // if (validatationErrorsFound) {
        //     throw new ThrowValidationException(validatationErrorsFound);
        // }

        const keyHeader = ctx.get('x-api-key');
        if (!keyHeader) {
            throw new ThrowToRequestException('E0002', 401);
        }

        const splitKeyHeader = keyHeader.split(':');
        if (splitKeyHeader.length !== 2) {
            throw new ThrowToRequestException('E0002', 401);
        }

        // TODO: Your logic below...

        // const decryptedKey = decrypt('STORED_IEncryptedPackage_FROM_DB?');
        // if (decryptedKey !== splitKeyHeader[1]) {
        //     throw new ThrowToRequestException('E0003', 401);
        // }

        // const user = UserService.getUser();
        const user: IUser = {
            id: 'uuid',
            locale: 'en',
        };

        const jwtToken = AuthService.createSession(user);

        respond(ctx, jwtToken);
    } catch (e) {
        respondError(ctx, e);
    }
}
