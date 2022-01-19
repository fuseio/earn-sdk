"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChefRewardProgram = exports.MultiRewardProgram = exports.SingleRewardProgram = void 0;
const SingleRewardProgram_1 = __importDefault(require("./rewards/SingleRewardProgram"));
exports.SingleRewardProgram = SingleRewardProgram_1.default;
const MultiRewardProgram_1 = __importDefault(require("./rewards/MultiRewardProgram"));
exports.MultiRewardProgram = MultiRewardProgram_1.default;
const ChefRewardProgram_1 = __importDefault(require("./rewards/ChefRewardProgram"));
exports.ChefRewardProgram = ChefRewardProgram_1.default;
