# shallowRef
>  `ref` 默认是深层的 `track`，`shallowRef`是一个浅层的 `track`，只会对 `.value` 的修改进行 `trigger`，如果是对  `.value.xxx` 的修改是不会触发 `trigger` 的


```ts
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)
```
:::tip
但是可以通过`triggerRef`触发`shallowRef`的深层`trigger`
:::


