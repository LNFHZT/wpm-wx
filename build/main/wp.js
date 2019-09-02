"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
class Wp {
    constructor() {
        if (!instance) {
            instance = this;
            // 
            main_1.initVmWp(instance);
            // 当wp 对象生成的时候，重写Page 对象
            main_1.initWp();
        }
        return instance;
    }
    static use() {
        for (let i = 0; i < arguments.length; i++) {
            let item = arguments[i];
            item && item.install && item.install(Wp);
        }
    }
}
let instance;
exports.default = Wp;
