import center from "./center";
import mixins from "./mixins";
import vm from "./vm";
import { type } from '../util/index';
import VmWp from './vmWp';
// 初始化注册内部api 
export function initCerter() {
    // mixins 的push 方法
    center.on('mixinsPush', (data: any) => {
        mixins.push(data);
    });
    center.on('mixinsUse', (data: any) => {
        mixins.use(data);
    });
    center.on('mixins', (data: any, type: any) => {
        return mixins.mixins(data, type);
    });
    center.on('vmMixis', (data: any, type: String) => {
        let config = vm.__mixins(data, type);
        return config;
    });
    center.on('initVm', () => {
        let data = vm.__handleData();
        center.emit('mixinsUse', data);
    });
}

export function initVmWp(self: any) {
    for (let key in self) {
        // @ts-ignore  
        VmWp.prototype[key] = self[key];
    }
    center.emit('initVm');
}


export function initWp() {
    const wxPage: Function = Page, wxComponent: Function = Component, wxApp = App;
    Page = function (config: any) {
        !config.mixins && (config.mixins = []);
        config = center.emit('vmMixis', config, type.page);
        return wxPage(config)
    }
    Component = function (config: any) {
        !config.mixins && (config.mixins = []);
        config = center.emit('vmMixis', config, type.component);
        return wxComponent(config)
    }
}