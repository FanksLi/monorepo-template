## 构建日志

## hooks

- hook 添加
- hooks 项目rollup打包分包配置
- 项目发布

### 打包

```js
    // 将 CommonJS 模块转换为 ES6 模块，以便 Rollup 可以处理它们。
    "@rollup/plugin-commonjs": "^28.0.6",
    // 使 Rollup 能够使用 Node.js 的模块解析机制来查找和打包第三方模块。
    "@rollup/plugin-node-resolve": "^16.0.1",
    // 允许 Rollup 插件处理 TypeScript 代码。
    "@rollup/plugin-typescript": "^12.1.3",
    // 提供用于匹配文件路径的模式匹配功能，常用于批量处理文件。
    "glob": "^11.0.3",
    // Rollup 是一个 JavaScript 模块打包工具。
    "rollup": "^4.44.0",
    // 在构建之前清理指定的输出目录或其他需要清理的文件。
    "rollup-plugin-cleaner": "^1.0.0",
    //用于生成 TypeScript 声明文件（.d.ts），方便类型定义的分发。
    "rollup-plugin-dts": "^6.2.1",
    //对生成的代码进行压缩和混淆，减小最终包的体积。
    "rollup-plugin-terser": "^7.0.2"
```

### 测试

```js
    // 对 JSX 和 React 快速刷新（Fast Refresh）的支持，使得在开发过程中可以实时看到代码更改的效果。
    "@vitejs/plugin-react": "^4.6.0",
    // 显示测试覆盖率
    "@vitest/coverage-istanbul": "^3.2.4",
    // 这是 Vitest 测试框架的用户界面插件，提供了一个图形化界面来查看和运行测试用例。通过这个 UI，开发者可以更方便地调试和管理测试。
    "@vitest/ui": "^3.2.4",
    // 这个库扩展了 Jest 的匹配器（Matchers），提供了更多的 DOM 元素断言方法，使得在编写单元测试时更容易地验证 DOM 状态。
     "@testing-library/jest-dom": "^6.6.3",
    //  这是 Testing Library 提供的专门用于 React 组件测试的工具库。它提供了一套简单易用的 API 来渲染和测试 React 组件的行为，确保组件按照预期工作。
    "@testing-library/react": "^16.3.0",
    // JSDOM 是一个用于 Node.js 的轻量级浏览器模拟环境，允许在服务器端模拟 DOM 操作。这对于前端测试非常有用，因为它可以让测试代码像在浏览器中一样操作 DOM。
    "jsdom": "^26.1.0",
    // 用户事件模拟
    "@testing-library/user-event": "^14.6.1",
    "vitest": "^3.2.4"
```
