"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChefUser = exports.getChefPool = void 0;
const utils_1 = require("../utils");
const query_1 = require("./query");
function getChefPool(pid, chef) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof pid === 'undefined' || typeof chef === 'undefined')
            return null;
        const subgraph = utils_1.getChefSubgraph(chef);
        const result = yield (subgraph === null || subgraph === void 0 ? void 0 : subgraph.query({
            query: query_1.poolQuery(pid)
        }));
        return ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.pool) ? (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.pool : null;
    });
}
exports.getChefPool = getChefPool;
function getChefUser(pid, account, chef) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof pid === 'undefined' || typeof chef === 'undefined' || !account)
            return null;
        const subgraph = utils_1.getChefSubgraph(chef);
        const result = yield (subgraph === null || subgraph === void 0 ? void 0 : subgraph.query({
            query: query_1.userQuery(pid, account)
        }));
        return ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.user) ? (_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.user : null;
    });
}
exports.getChefUser = getChefUser;
