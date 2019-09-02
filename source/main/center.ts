
/**
 * @constructor  任务中心类
 * @classdesc  内部方法都注册到这个类中
 */
class Center {
    private handlers: any = {};
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance
    }
    on(eventType: string, fuc: Function) {
        if ((eventType in this.handlers)) {
            // console.warn('已注册，重新注册覆盖');
        }
        this.handlers[eventType] = fuc;
        return this;
    }
    // 触发事件(发布事件)
    emit(eventType: string, ...data: any[]) {
        if (!this.handlers[eventType]) {
            console.warn(`没有事件可以触发${eventType}`);
            return this;
        }
        try {
            return this.handlers[eventType](...data);
        } catch (error) {
            console.error(`触发事件错误：${eventType}`);
            console.error(error);
        }
    }
    // 删除订阅事件
    off(eventType: string, handler: Function) {
        var currentEvent = this.handlers[eventType];
        var len = 0;
        if (currentEvent) {
            len = currentEvent.length;
            for (var i = len - 1; i >= 0; i--) {
                if (currentEvent[i] === handler) {
                    currentEvent.splice(i, 1);
                }
            }
        }
        return this;
    }
}
let instance: Center;

export default new Center();