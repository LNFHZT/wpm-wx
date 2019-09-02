import VmWp from './vmWp';
import center from './center';
import { deepCopy } from '../util/index';
class Vm extends VmWp {
    constructor() {
        if (!instance) {
            super();
            instance = this;
        }
        return instance
    }
    __mixins(config: any, type: String): Object {
        let data = center.emit('mixins', config, type);
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
let instance: Vm;
let vm = new Vm();

export default vm;