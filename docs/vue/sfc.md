## 单文件组件
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <h1>Hello Vue</h1>
  </div>
</template>
```

编码后
```ts
{
  setup(){

  },
  render(){

  }
}
```
:::info
vue 单文件组件会被编译为一个对象，这个对象具有`setup`属性和`render`属性，分别对应`script`标签中的内容和`template`标签的内容，
- `setup`进行数据绑定
- `render` 将模版解析为虚拟DOM树，然后根据虚拟DOM树渲染页面内容
:::
