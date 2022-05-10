import * as Koa from 'koa';
import * as Router from 'koa-router';

export const secureRouter = new Router();

secureRouter.get('/secure', async (ctx: Koa.Context) => {
    ctx.body = 'This is a secure route.';
});
