import Compile from './compile'
import {Observer} from './observer'
import Watcher from './watcher'
class MVVM {
  constructor(options) {
    this.$options = options || {}
    let data = this._data = this.$options.data 

    // 数据代理
    Object.keys(data).forEach((key) => {
      this._proxyData(key)
    })
    // 初始化计算属性
    this._initComputed()
    // 监听数据
    this.observer(data)
    // 编译
    this.$compile = new Compile(options.el || document.body, this)
  }
  _proxyData(key) {
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  }
  _initComputed() {
    let computed = this.$options.computed
    if (typeof computed === 'object') 
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this, key, {
          get() {
            typeof computed[key] === 'function' 
              ? computed[key] 
              : computed[key].get
          },
          set() {

          }
        })
      })
  }
  $watch(key, cb) {
    new Watcher(this, key, cb)
  }
  observer(data) {
    new Observer(data)
  }
}

export default MVVM