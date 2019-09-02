import { initWp, initVmWp } from './main';

class Wp {
    constructor() {
        if (!instance) {
            instance = this;
            // 
            initVmWp(instance);
            // 当wp 对象生成的时候，重写Page 对象
            initWp();
        }
        return instance
    }
    static use(): void {
        for (let i = 0; i < arguments.length; i++) {
            let item: any = arguments[i];
            item && item.install && item.install(Wp)
        }
    }
    // 全局 mixins 待考虑
    // static mixins(...data: Array<any>): void {
    //     // let obj = {};
    //     // data.forEach(item => {
    //     //     // center.emit('mixinsPush', item);
    //     // })
    // }
}
let instance: Wp;

export default Wp;