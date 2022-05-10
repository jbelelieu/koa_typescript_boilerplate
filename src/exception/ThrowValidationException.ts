/**
 * For validation errors.
 */
export class ThrowValidationException extends Error {
    private _httpCode = 400;

    constructor(message: any) {
        super(message);

        this.name = this.constructor.name;
    }

    get httpCode(): number {
        return this._httpCode;
    }
}
