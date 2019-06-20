function definReactive (obj, key, val) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get(){
      dep.addSub(Dep.target)
      return val
    },
    set(newVal) {
      if(val === newVal) {
        return
      }
      dep.notify(newVal)
    }
  })
}

const observer = (obj) => {
  if (!obj || (typeof obj !== 'object')) {
    return
  }

  Object.keys(obj).forEach((value, key) => {
    definReactive(obj, key, obj[key])
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer(this._data)
    // new watcher()
  }
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
    if (newVal) {
      console.log('视图更新了')
    }
  }
}

Dep.target = null

let v = new Vue({
  data: {
    test: '1111'
  }
})
v._data.test = '2222'
console.log(v)