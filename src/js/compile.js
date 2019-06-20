class Compile {
  constructor(el, vm) {
      this.el = this.isElementNode(el) ? el : document.querySelector(el); //#app document.que
      this.vm = vm;
      if (this.el) {
          //如果这个元素能获取到，才开始编译
          //1.先把真实的dom移入内存中fragment
          let fragment = this.node2Fragment(this.el);
          //2.编译=>提取想要的元素节点v-model和文本节点{{}}
          this.compile(fragment);
          //3.把编译好的fragment再塞回页面里去
          this.el.appendChild(fragment);
      }
  }
  //专门写一些辅助方法
  isElementNode(node) {
      return node.nodeType == 1;
  }
  isDirective(name) {
      return name.includes('v-');
  }
  //核心方法
  compileElement(node) {
      //编译带v-model
      let attrs = node.attributes;
      // console.log(attrs);
      Array.from(attrs).forEach(attr => {
          // console.log(attr.value);
          //判断是不是v-指令
          let attrName = attr.name;
          // let type = attrName.slice(2);
          let [, type] = attrName.split('-');
          if (this.isDirective(attrName)) {
              // node this.vm.$data expr
              //todo ....
              let expr = attr.value;
              CompileUtil[type](node, this.vm, expr);
          }
      })
  }
  compileText(node) {
      //编译文本
      let text = node.textCotent;
      let reg = /\{\{([^}]+)\}\}/g;
      if (reg.test(text)) {
          // node this.vm.$data text
          //todo ....
          CompileUtil['text'](node, this.vm, expr);
      }
  }
  compile(fragment) {
      //需要递归
      let childNodes = fragment.childNodes;
      Array.from(childNodes).forEach(node => {
          if (this.isElementNode(node)) {
              //元素节点，还需深入检查
              this.compile(node);
              console.log('element', node);
              this.compileElement(node);
              this.compile(node);
          } else {
              //文本节点
              console.log('text', node);
              this.compileText(node);
          }
      })

  }
  node2Fragment(el) {
      //需要将el中的内容全部放进内存里
      //文档碎片
      let fragment = document.createDocumentFragment();
      let firstChild;
      while (firstChild = el.firstChild) {
          fragment.appendChild(firstChild);
      }
      return fragment; //内存中的节点
  }
}

//工具方法
let CompileUtil = {
  getVal(vm, expr) {
      expr = expr.split('.');
      return expr.reduce((prev, next) => {
          return prev[next];
      }, vm.$data)
  },
  getTextVal(vm, expr) {
      return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
          return this.getVal(vm, args[1]);
      })
  },
  text(node, vm, expr) {
      let updateFn = this.updater['textUpdater'];
      let value = this.getTextVal(vm, expr);
      updateFn && updateFn(node, value)
  },
  model(node, vm, expr) {
      let updateFn = this.updater['modelUpdater'];
      updateFn && updateFn(node, this.getVal(vm, expr));
  },
  updater: {
      textUpdater(node, value) {
          node.textCotent = value;
      },
      modelUpdater(node, value) {
          node.value = value;
      }
  }
}

export default Compile;