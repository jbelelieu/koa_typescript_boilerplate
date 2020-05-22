import * as Koa from 'koa';
import * as Router from 'koa-router';

export const router = new Router();

router.get('/ping', async (ctx: Koa.Context) => {
  ctx.body = 'pong';
});
