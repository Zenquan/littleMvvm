import {Dep} from './observer'

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    this.expOrFn = expOrFn
    this.depIds = {}

    if(typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = this.pariserGetter(expOrFn.trim())
    }
    this.value = this.get()
  }
  update() {
    this.run()
  }
  run() {
    let value = this.get()
    let oldVal = this.value
    if(value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  }
  addDep(dep) {
    if(!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  get() {
    Dep.target = this
    let value = this.getter.call(this.vm, this.vm)
    return value
    Dep.target = null
  }
  pariserGetter(exp) {
    if((/[^\w.$]/).test(exp)) return

    let exps = exp.split('.')

    return obj => {
      exps.forEach(exp => {
        if(!obj) return
        obj = exp
      })
      return obj
    }
  }
}

export default Watcher