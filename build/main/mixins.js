"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../util/index");
const hookPage = ["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll", "onResize", "onTabItemTap"], hookCom = ["created", "attached", "ready", "moved", "detached",], hookApp = ["onLaunch", "onShow", "onHide", "onError", "onPageNotFound"];
class Mixins {
    constructor() {
        this.mixinsArr = [];
        this.useData = {};
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    mixins(config, typValue) {
        let data = {}, mix = index_1.deepCopy(this.mixinsArr), hookData = {}, mixData = {}, objData = {}, useData = this.useData, copConfig = index_1.deepCopy(config);
        mix = mix.concat(index_1.deepCopy(config.mixins));
        delete config.mixins;
        let crux = [];
        if (index_1.type.page == typValue) {
            crux = hookPage;
        }
        else if (index_1.type.component == typValue) {
            crux = hookCom;
        }
        // 循环过后 mix 剩余都是钩子函数/和data
        mix.forEach((item, index) => {
            Object.keys(item).forEach(key => {
                // @ts-ignore
                if (!crux.includes(key)) {
                    //@ts-ignore
                    if (index_1.isFunction(item[key])) {
                        // @ts-ignore
                        mixData[key] = item[key];
                    }
                    else {
                        // @ts-ignore
                        // objData[key] = item[key];
                        objData = index_1.extend(index_1.deepCopy(objData), item[key]);
                    }
                    // @ts-ignore
                    delete item[key];
                }
            });
        });
        crux.forEach((key, index) => {
            let keyHook = [];
            mix.forEach(item => {
                // @ts-ignore
                if (item[key]) {
                    // @ts-ignore
                    keyHook.push(item[key]);
                }
            });
            if (!index) {
                // @ts-ignore
                hookData[key] = function (...data) {
                    Object.keys(useData).forEach(ele => {
                        // @ts-ignore
                        this[ele] = useData[ele];
                    });
                    // @ts-ignore
                    Object.keys(mixData).forEach(ele => {
                        // @ts-ignore
                        this[ele] = mixData[ele];
                    });
                    keyHook.forEach(item => {
                        item.apply(this, ...data);
                    });
                    //@ts-ignore
                    copConfig[key] && (copConfig[key].apply(this, data));
                    // @ts-ignore
                    config[key] && (delete config[key]);
                };
            }
            else if (keyHook.length) {
                // @ts-ignore
                hookData[key] = function (...data) {
                    keyHook.forEach(item => {
                        item.apply(this, ...data);
                    });
                    //@ts-ignore
                    copConfig[key] && (copConfig[key].apply(this, data));
                    // @ts-ignore
                    config[key] && (delete config[key]);
                };
            }
        });
        config.data = index_1.extend(index_1.deepCopy(objData), index_1.deepCopy(config.data));
        data = index_1.extend(index_1.deepCopy(config), index_1.deepCopy(hookData));
        return data;
    }
    push(data) {
        this.mixinsArr.push(data);
    }
    use(data) {
        this.useData = data;
    }
}
let instance;
exports.default = new Mixins();
