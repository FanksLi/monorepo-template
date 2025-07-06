import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 每个测试后清理渲染的组件
afterEach(() => {
  cleanup();
});
