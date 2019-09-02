import { deepCopy, type, extend, isFunction } from '../util/index';
const hookPage: Array<String> = ["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll", "onResize", "onTabItemTap"],
    hookCom: Array<String> = ["created", "attached", "ready", "moved", "detached",],
    hookApp: Array<String> = ["onLaunch", "onShow", "onHide", "onError", "onPageNotFound"];

class Mixins {
    private mixinsArr: Array<Object> = [];
    private useData: Object = {};
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance
    }
    mixins(config: any, typValue: String): Object {
        let data: Object = {}, mix: Array<Object> = deepCopy(this.mixinsArr), hookData: Object = {}, mixData: Object = {},
            objData: Object = {}, useData = this.useData, copConfig: Object = deepCopy(config);
        mix = mix.concat(deepCopy(config.mixins));
        delete config.mixins;
        let crux: Array<String> = [];
        if (type.page == typValue) {
            crux = hookPage;
        } else if (type.component == typValue) {
            crux = hookCom;
        }
        // 循环过后 mix 剩余都是钩子函数/和data
        mix.forEach((item, index) => {
            Object.keys(item).forEach(key => {
                // @ts-ignore
                if (!crux.includes(key)) {
                    //@ts-ignore
                    if (isFunction(item[key])) {
                        // @ts-ignore
                        mixData[key] = item[key];
                    } else {
                        // @ts-ignore
                        // objData[key] = item[key];
                        objData = extend(deepCopy(objData), item[key]);
                    }
                    // @ts-ignore
                    delete item[key];
                }
            })
        })
        crux.forEach((key, index) => {
            let keyHook: Array<Function> = [];
            mix.forEach(item => {
                // @ts-ignore
                if (item[key]) {
                    // @ts-ignore
                    keyHook.push(item[key]);
                }
            });
            if (!index) {
                // @ts-ignore
                hookData[key] = function (...data: Array<any>) {
                    Object.keys(useData).forEach(ele => {
                        // @ts-ignore
                        this[ele] = useData[ele];
                    })
                    // @ts-ignore
                    Object.keys(mixData).forEach(ele => {
                        // @ts-ignore
                        this[ele] = mixData[ele];
                    })
                    keyHook.forEach(item => {
                        item.apply(this, ...data);
                    })
                    //@ts-ignore
                    copConfig[key] && (copConfig[key].apply(this, data));
                    // @ts-ignore
                    config[key] && (delete config[key])
                }
            } else if (keyHook.length) {
                // @ts-ignore
                hookData[key] = function (...data: Array<any>) {
                    keyHook.forEach(item => {
                        item.apply(this, ...data);
                    })
                    //@ts-ignore
                    copConfig[key] && (copConfig[key].apply(this, data));
                    // @ts-ignore
                    config[key] && (delete config[key])
                }
            }
        })
        config.data = extend(deepCopy(objData), deepCopy(config.data))
        data = extend(deepCopy(config), deepCopy(hookData));
        return data;
    }
    push(data: any): void {
        this.mixinsArr.push(data);
    }
    use(data: any): void {
        this.useData = data;
    }
}

let instance: Mixins;

export default new Mixins();