import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as AuthController from '../controller/AuthController';

/**
 * Public Routes
 */
export const publicRouter = new Router();

publicRouter.get('/ping', async (ctx: Koa.Context) => {
  ctx.body = 'pong';
});

publicRouter.post('/login', async (ctx: Koa.Context) => {
  await AuthController.login(ctx);
});