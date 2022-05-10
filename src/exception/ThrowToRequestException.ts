import { translate } from '../helper/localization';

/**
 * Custom exception which is triggered when something
 * goes wrong in a routine or service which we expect
 * the controller to handle and send back to the client.
 */
export class ThrowToRequestException extends Error {
    private _code: string;
    private _httpCode = 500;

    constructor(internalCode, httpCode = 500) {
        super(translate(internalCode));

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this._code = internalCode;

        this._httpCode = httpCode;
    }

    get code(): string {
        return this._code;
    }

    get httpCode(): number {
        return this._httpCode;
    }
}
