# littleMvvm
>这是看了网上一些关于MVVM的文章而总结的，也通过自己实现一遍来理解MVVM的原理。

## MVVM框架Vue的设计思想
- 首先vue是通过Object.defineProperty()来实现对属性的劫持做数据绑定的，达到监听数据变动的目的，通过getter、setter来获取属性值和设置属性值。
- 然后通过一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，通过Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图，由指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。 

![](https://ws1.sinaimg.cn/large/005Pf0eLgy1g46ig5d6gmj30ka0aujrc.jpg)

## 具体实现
- 1、数据监听器Observer: 能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
- 2、指令解析器Compile: 对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 
- 3、Watcher: 作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 
- 4、mvvm: 整合以上三者

## Todo

- [ ] 视图还没改过来
- [ ] watcher有点问题 