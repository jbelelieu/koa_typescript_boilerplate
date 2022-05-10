import { Context } from 'koa';
import { config } from '../config/config';
import { ThrowToRedirectException } from '../exceptions/ThrowToRedirectException';
import { ThrowToRequestException } from '../exceptions/ThrowToRequestException';
import { ThrowValidationException } from '../exceptions/ThrowValidationException';
import { translate } from './localization';

/**
 * Builds a query string out of a JSON object.
 * 
 * @param object 
 * @returns 
 */
export function buildQueryStringFromObject(object: any): string {
    return Object.keys(object).map(key => key + '=' + object[key]).join('&');
}

/**
 * @param ctx 
 * @returns 
 */
export function getLocaleForRequest(ctx: Context): string {
    const locale = ('locale' in ctx.request.headers)
        ? ctx.request.headers.locale
        : config.DEFAULT_LOCALE;

    return (typeof locale === 'string') ? locale : locale[0];
}

/**
 * Respond to an HTTP request.
 * 
 * @param koaContext 
 * @param message 
 * @param httpStatus 
 */
export function respond(koaContext: Context, message: any = null, httpStatus = 200): void {
    koaContext.status = httpStatus;

    koaContext.body = message;

    return;
}

/**
 * @param ctx 
 * @param e 
 */
export function respondError(ctx: Context, e: Error | ThrowToRequestException): void {
    if (e instanceof ThrowToRequestException) {
        respond(ctx, translate(e.message), e.httpCode);
    }

    else if (e instanceof ThrowValidationException) {
        respond(ctx, e.message, 400);
    }

    else if (e instanceof ThrowToRedirectException) {
        ctx.status = 301;
        ctx.redirect(e.message);
    }

    else {
        respond(ctx, (e.message) ? e.message : translate('E0001'), 500);
    }

    return;
}