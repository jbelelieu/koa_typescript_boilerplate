import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as ratelimit from 'koa-ratelimit';
import { config } from './config/config';
import { publicRouter } from './router/publicRoutes';
import { secureRouter } from './router/secureRoutes';
import * as jwt from 'koa-jwt';

const app = new Koa();

app.use(ratelimit({
	driver: 'memory',
	db: new Map(),
	duration: 30000,
	errorMessage: 'Rate-limit reached: please slow down.',
	id: (ctx: Koa.Context) => ctx.ip,
	headers: {
		remaining: 'Rate-Limit-Remaining',
		reset: 'Rate-Limit-Reset',
		total: 'Rate-Limit-Total'
	},
	max: 700,
	disableHeader: false,
}));

// Body Parsing
app.use(bodyParser());

// Logging
if (config.NODE_ENV !== 'test' && config.NODE_ENV !== 'production') {
	app.use(logger());
}

// CORS
app.use(cors({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Origin, Accept-Language, Authorization, X-Requested-With, Content-Type, Accept',
	'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
}));

app.use(publicRouter.routes()).use(publicRouter.allowedMethods());

// TODO: JWT Security
app.use(jwt({ secret: config.APP_JWT_SECRET }));

app.use(secureRouter.routes()).use(secureRouter.allowedMethods());

// Start the server
export const server = app.listen(config.PORT || 4000);
