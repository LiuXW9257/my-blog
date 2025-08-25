# customRef 自定义 ref
`customRef` 
- 接受一个函数，并给这个函数提供`track`、`trigger`函数用于**依赖收集**和**触发更新**「 类似于 `Promise` 的 `executor`」
- 返回一个 `ref` 对象。

:::tip
**自定义**`Ref` 
- **访问**这个变量的时候，自定义`get`函数的返回
- **修改**这个变量的时候，自定义`set`函数的操作 【延迟操作等...】 
:::


```vue
<script setup lang="ts">
import { customRef } from 'vue'

const debounceRef = (value: number, delay = 2000) => {
  return customRef((track, trigger) => {
    let timeout: ReturnType<typeof setTimeout>
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

const value = debounceRef(0)
</script>

<template>
  <div>
    <span>{{ value }}</span>
    <br />
    <input v-model="value" />
  </div>
</template>

<style scoped></style>
```