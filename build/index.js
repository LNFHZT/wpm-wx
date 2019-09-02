"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wp_1 = __importDefault(require("./main/wp"));
const main_1 = require("./main/main");
//  初始化注册方法
main_1.initCerter();
exports.default = wp_1.default;
