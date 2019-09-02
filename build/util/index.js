"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type;
(function (type) {
    type["page"] = "Page";
    type["component"] = "Component";
    type["app"] = "App";
})(type = exports.type || (exports.type = {}));
function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}
exports.isFunction = isFunction;
function deepCopy(obj) {
    if (obj == null) {
        return null;
    }
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]); // 如果是对象，再次调用该方法自身 
            }
            else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
exports.deepCopy = deepCopy;
function extend(...nums) {
    var name, options, src, copy, deep = false, //是否深拷贝 默认为false
    length = arguments.length, i = 1, target = arguments[0] || {};
    //如果第一个参数为boolean类型,赋值给deep
    if (typeof target == 'boolean') {
        deep = arguments[0];
        target = arguments[i] || {}; //目标对象顺延
        i++;
    }
    //如果target不是对象数据类型的话  target赋值为 {}
    if (['object', 'function'].indexOf(typeof target) < 0) {
        target = {};
    }
    for (; i < length; i++) {
        options = arguments[i];
        if (options != null) {
            for (name in options) {
                copy = options[name];
                src = target[name];
                if (target === copy) { //避免重复循环
                    continue;
                }
                if (deep && copy && (typeof copy == 'object')) { // 类型判断
                    src = Object.prototype.toString.call(copy) == '[object Array]' ? [] : {}; //区分数组和‘对象’
                    target[name] = extend(deep, src, copy);
                }
                else {
                    if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
}
exports.extend = extend;
