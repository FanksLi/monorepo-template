---
nav:
  path: /hooks
---

## useUpdateEffect

创建一个只在依赖项更新时执行的 effect。

### 示例

<code src="./demo/index.tsx"></code>

### api

| 参数 | 说明   | 类型                     | 默认值 |
| ---- | ------ | ------------------------ | ------ |
| fn   | 函数   | (...args: any[]) => void | -      |
| deps | 依赖项 | any[]                    | -      |
