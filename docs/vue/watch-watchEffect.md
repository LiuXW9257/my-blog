# 侦听变化
> `watchEffect`、`watch`

## watchEffect

```ts
const { stop, pause, resume } = watchEffect(() => {})

// 暂停侦听器
pause()

// 稍后恢复
resume()

// 停止
stop()
```

### 副作用清理
```ts
watchEffect(async (onClearup) => {
  const { resp, cancel } = await doSomething()
  onClearup(() => cancel())
  data.value = resp
})
```
:::tip
`onClearup` 会在下一次`effect`执行前被调用
:::

## watch
:::tip
`watch` 是懒侦听，他只会在侦听的数据源发生变化的时候才会调用，和回调函数用到了哪些数据无关
:::

### watch 的数据源包含三种形式
```ts
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): WatchHandle

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | (T extends object ? T : never) // 响应式对象
```

:::tip
- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组
:::

### watch 的回调函数
```ts
watch(source, (newValue, oldValue, onCleanup) => { })
```
:::tip
当source是一个数组的时候，`newValue`和`oldValue`都是数组
:::

### options

```ts
interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean | number // 默认：false
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  once?: boolean // 默认：false (3.4+)
}
```

:::tip
- `immediate`: 是否在初始化时执行回调，此时的`oldValue`为`undefined`
- `deep`: 是否深度监听 `boolean`，**还可以表示监听的层级** `number`
- `once`: 是否只执行一次
:::


当直接侦听一个响应式对象时，侦听器会**自动启用深层模式**：
```ts
const state = reactive({ count: 0 })
watch(state, () => {
  /* 深层级变更状态所触发的回调 */
})
```
当使用`getter`函数作为源时，回调只在此函数的**返回值**变化时才会触发
```ts
const state = reactive({ count: 0 })
watch(
  () => state,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  { deep: true }
)
```
:::tip
如果想让回调在**深层级变更**时也能触发，你需要使用 `{ deep: true }` 强制侦听器进入深层级模式。在深层级模式时，如果回调函数由于深层级的变更而被触发，那么**新值和旧值将是同一个对象**。
:::

```ts
const { stop, pause, resume } = watch(() => {})

// 暂停侦听器
pause()

// 稍后恢复
resume()

// 停止
stop()
``` 

## 同步清理函数
```ts
function onWatcherCleanup(
  cleanupFn: () => void,
  failSilently?: boolean
): void
```

```ts
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const { response, cancel } = doAsyncWork(newId)
  // 如果 `id` 变化，则调用 `cancel`，
  // 如果之前的请求未完成，则取消该请求
  onWatcherCleanup(cancel)
})
```

:::tip
- 只能在回调函数是同步函数的时候使用，在下次执行前调用
- 回调函数的`onClearup`函数可以才能用于**异步**的清理
:::