function definReactive(obj, key, val) {
  var dep = new Dep()
  Object.defineProperty(obj, key, {
    // enumerable: true,
    // configurable: false,
    get() {
      dep.addSub(Dep.target)
      return val
    },
    set(newVal) {
      if(val === newVal) return 
      val = newVal
      dep.notify(newVal)
    }
  })
}

let observer = (val) => {
  if(!val || (typeof val !== 'object')) {
    return 
  }
  Object.keys(val).forEach((key) => {
    definReactive(val, key, val[key])
  })
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify(newVal) {
    this.subs.forEach(sub => {
      sub.update(newVal)
    })
  }
}
class watcher {
  constructor() {
    Dep.target = this
  }
  update(newVal) {
    if(newVal) {
      console.log('视图更新了')
    }
  }
}

Dep.target = null

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
  }
}

let v = new Vue({
  data: {
    test: '1111'
  }
})

v._data.test = '2222'
console.log(v)