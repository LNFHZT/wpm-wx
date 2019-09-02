"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const center_1 = __importDefault(require("./center"));
const mixins_1 = __importDefault(require("./mixins"));
const vm_1 = __importDefault(require("./vm"));
const index_1 = require("../util/index");
const vmWp_1 = __importDefault(require("./vmWp"));
// 初始化注册内部api 
function initCerter() {
    // mixins 的push 方法
    center_1.default.on('mixinsPush', (data) => {
        mixins_1.default.push(data);
    });
    center_1.default.on('mixinsUse', (data) => {
        mixins_1.default.use(data);
    });
    center_1.default.on('mixins', (data, type) => {
        return mixins_1.default.mixins(data, type);
    });
    center_1.default.on('vmMixis', (data, type) => {
        let config = vm_1.default.__mixins(data, type);
        return config;
    });
    center_1.default.on('initVm', () => {
        let data = vm_1.default.__handleData();
        center_1.default.emit('mixinsUse', data);
    });
}
exports.initCerter = initCerter;
function initVmWp(self) {
    for (let key in self) {
        // @ts-ignore  
        vmWp_1.default.prototype[key] = self[key];
    }
    center_1.default.emit('initVm');
}
exports.initVmWp = initVmWp;
function initWp() {
    const wxPage = Page, wxComponent = Component, wxApp = App;
    Page = function (config) {
        !config.mixins && (config.mixins = []);
        config = center_1.default.emit('vmMixis', config, index_1.type.page);
        return wxPage(config);
    };
    Component = function (config) {
        !config.mixins && (config.mixins = []);
        config = center_1.default.emit('vmMixis', config, index_1.type.component);
        return wxComponent(config);
    };
}
exports.initWp = initWp;
