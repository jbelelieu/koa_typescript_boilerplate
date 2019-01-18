import * as Router from 'koa-router';

export const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});