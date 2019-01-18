"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const routes_1 = require("./router/routes");
const app = new Koa();
app.use(bodyParser());
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'local') {
    app.use((ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (ctx.hostname !== process.env.WHITELISTED_HOST && ctx.ip !== process.env.WHITELISTED_HOST) {
            ctx.throw(401);
        }
        if (!ctx.secure) {
            ctx.throw(406);
        }
        yield next();
    }));
}
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
    app.use(logger());
}
app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
exports.server = app.listen(process.env.PORT || 4000);
//# sourceMappingURL=index.js.map