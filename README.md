# WPM-WX
wpm 主要是适用于微信小程序的npm包 用于扩展微信小程序的原生this对象。 </br>
注：只扩展了Page和Component  </br>
想要扩展全局对象，可以直接用this 调用 </br>

## 安装
npm install wpm-wx --save </br>
cnpm install wpm-wx --save

## 引用
import Wpm from 'wpm-wx'; </br>
const Wpm = require("wpm-wx").default; </br>

## 示例
// 新建main.js</br>
import Wpm from 'wpm-wx'; </br>
Wpm.prototype.xxx = xxx; </br>
new Wpm();  // 新建Wpm 对象，最好在App({...}) 运行前执行</br>
</br>
app.js</br>
// app.js</br>
import './main.js';</br>
App({});</br>

## 简介
实现use 和 mixins 方法
Wpm.use(xxx);

Page({
  mixins:[xxx],
})

Component({
  mixins:[xxx],
})

## use说明
传入的对象 有一个install函数，</br>
{</br>
    install(Wpm) {</br>
      Wpm.prototype.xxx = xxx;</br>
    }</br>
}</br>

## mixins说明
使用方式和vue 的相同

## 版本
* alpha v0.01</br>
内置实现mixins 函数， 与VUE的mixins使用方法相似， 例子 Page({mixins:[test]})</br>
mixins 混入方法，实现了所有钩子函数的整合，即page 定义 onshow 混入 的test 文件中也有onshow 执行优先级，则是 先执行test 文件中的onshow 然后再执行page 定义的onshow 局部混入，假设全局混入一个onshow 执行结果是 全局=>局部=>page 普通函数则不支持整合，覆盖优先级，是 page=>局部=>全局 </br>

wp 对象先开放两个方法 use => wp.use(data) 执行data 里的install 方法,install 参数wo对象，在install 方法里面可以全局混入，或者将对象挂载在wp.prototype 上，最后实现挂载在Page和Component实例中 mixins=>wp.mixins(data) data 是个对象,{test(){console.log('test')}} </br>
* alpha v0.0.2 </br>
1.用ts重写封装逻辑 </br>
2.重新设计封装架构，（独立各个模块，以任务中心的形式去设计，所有模块直接只依赖center ， 不再依赖具体模块）; </br>
3.mixins 的实现优化 </br>
* alpha v0.0.3 </br>
1.修复bug data 对象没有合并成功 </br>
2.修复bug 钩子函数未能正确保存调用 </br>
3.修复bug 钩子函数的参数未能正确传递，apply 方法使用有误 </br>
* alpha v0.0.4 </br>
1.新增npm关键词 </br>
