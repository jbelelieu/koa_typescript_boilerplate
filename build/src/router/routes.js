"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Router = require("koa-router");
const shardAccess_1 = require("../modules/shardAccess");
exports.router = new Router();
exports.router.get('/ping', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    ctx.body = 'pong';
}));
exports.router.post('/store', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const data = yield shardAccess_1.storeShard(ctx.request.body.lookUpKey, ctx.request.body.data);
    ctx.body = {
        "status": data
    };
}));
exports.router.get('/shard/:lookupKey', (ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const data = yield shardAccess_1.getShard(ctx.params.lookupKey);
    ctx.body = {
        "status": true,
        "data": data
    };
}));
//# sourceMappingURL=routes.js.map