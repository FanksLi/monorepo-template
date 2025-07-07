---
nav:
  path: /hooks
---

## useLoacleStorageState

存储一个可序列化的值，并返回一个包含该值的状态，以及一个更新该值的函数。当浏览器关闭时，该值会被存储在浏览器的 localStorage 中。状态改变时，该值会被存储在 localStorage 中，并刷新页面后恢复。

### 基本用法

<code src="./demo/demo01.tsx"></code>

### 默认值用法

<code src="./demo/demo02.tsx"></code>

### 高级用法

<code src="./demo/demo03.tsx"></code>

## api

| 参数                 | 说明       | 类型                   | 默认值         |
| -------------------- | ---------- | ---------------------- | -------------- |
| key                  | 存储的 key | string                 | -              |
| options              | 配置项     | object                 | -              |
| options.defaultValue | 默认值     | any                    | -              |
| options.deserialize  | 反序列化   | (value: string) => any | JSON.parse     |
| options.serialize    | 序列化     | (value: any) => string | JSON.stringify |
| options.onError      | 错误处理   | (error: Error) => void | -              |
