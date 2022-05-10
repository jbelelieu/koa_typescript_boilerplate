/**
 * Exception is used when we want the controller to force
 * a permanant redirect for a URL.
 */
export class ThrowToRedirectException extends Error {
    constructor(url) {
        super(url);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}
