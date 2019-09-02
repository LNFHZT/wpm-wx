"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vmWp_1 = __importDefault(require("./vmWp"));
const center_1 = __importDefault(require("./center"));
class Vm extends vmWp_1.default {
    constructor() {
        if (!instance) {
            super();
            instance = this;
        }
        return instance;
    }
    __mixins(config, type) {
        let data = center_1.default.emit('mixins', config, type);
        return data;
    }
    __handleData() {
        let data = {};
        for (let key in this) {
            //@ts-ignore
            data[key] = this[key];
        }
        return data;
    }
}
let instance;
let vm = new Vm();
exports.default = vm;
