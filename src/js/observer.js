class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(this.data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    let dep = new Dep()
    let childObj = observe(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        if(Dep.target) {
          dep.depend()
        }
      },
      set(newVal) {
        if(val === newVal) return 
        val = newVal
        childObj = observe(newVal)
        dep.notify()
      }
    })
  }
}
function observe(val) {
  if(!val || typeof val !== 'object') {
    return 
  }
  return new Observer(val)
}

let uid = 0

class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSubs(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    let index = this.subs.indexOf(sub)
    if(index != -1){
      this.subs.splice(index, 1)
    }
  }
  depend() {
    Dep.target.addSubs(this)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

Dep.target = null

export {
  Observer,
  Dep
}