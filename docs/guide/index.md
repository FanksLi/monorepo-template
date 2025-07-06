## 介绍

nn-hooks 是一个基于 React 的 Hooks 库，提供了丰富的 Hooks，帮助开发者快速实现业务逻辑。

## 特性

- 易学易用
- 开箱即用，零配置
- 覆盖大部分常用场景
- 包含丰富的基础hooks
- 包含大量提炼自业务的高级hooks
- 对输入输出的函数做了特殊处理，且避免闭包问题
- 使用TypeScript 构建，提供完整的类型定义文件

## 安装

```bash
$ npm install --save nn-hooks
# or
$ yarn add nn-hooks
# or
$ pnpm install --save nn-hooks
```

## 使用

```ts
import { useToggle } from 'nn-hooks';
```
