
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import { router } from './router/routes';
import * as jwt from 'koa-jwt';

const app = new Koa();

// Body Parsing
app.use(bodyParser());

// Logging
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
	app.use(logger());
}

// JWT Security
app.use(jwt({ secret: process.env.JWT_SECRET }));

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
export const server = app.listen(process.env.PORT || 4000);
