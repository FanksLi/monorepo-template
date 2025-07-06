import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // 模拟浏览器环境
    globals: true, // 启用全局 API（如 describe, expect）
    setupFiles: './tests/setup.ts', // 初始化文件
    coverage: {
      provider: 'istanbul', // 覆盖率报告
      include: ['packages/hooks/**/*.ts'], // 指定覆盖范围
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/cjs/**', '**/es/**'],
  },
});
