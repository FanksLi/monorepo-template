---
nav:
  path: /hooks
---

## useMemoizedFn

创建一个 memoized 的函数, 函数的返回值会缓存, 当依赖项变化时, 缓存的返回值会被更新.

### 示例

<code src="./dome/index.tsx"></code>

| 参数 | 说明 | 类型                    | 默认值 |
| ---- | ---- | ----------------------- | ------ |
| fn   | 函数 | (...args: any[]) => any | -      |
