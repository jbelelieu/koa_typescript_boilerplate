// import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
// import * as ratelimit from 'koa-ratelimit';
import { router } from './router/routes';
// import * as jwt from 'koa-jwt';

const app = new Koa();

// Rate limiting
// Set to a maximum of 700 requests per IP every 30 seconds.
/*
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
*/

// Body Parsing
app.use(bodyParser());

// Logging
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
	app.use(logger());
}

// CORS
// app.use(cors({
// 	'Access-Control-Allow-Origin': '*',
// 	'Access-Control-Allow-Headers': 'Origin, Accept-Language, Authorization, X-Requested-With, Content-Type, Accept',
// 	'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS',
// }));

// JWT Security
// app.use(jwt({ secret: process.env.JWT_SECRET }));

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
export const server = app.listen(process.env.PORT || 4000);
