# 虚拟 DOM
> 虚拟DOM实际上就是JS对象

```ts
const vnode = {
  type: 'div',
  props: {
    class: 'container'
  },
  children: []
}
```

```ts
import { h } from 'vue'

const vnode = h(type, props, children)
```

:::tip
- 一个**运行时渲染器**会遍历虚拟DOM树，将每个节点渲染为真实DOM节点，这个过程被称为**挂载**
- **运行时渲染器**还会比对虚拟DOM树的差异，这个过程被称为**diff**
:::