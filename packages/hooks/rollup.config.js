import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import { globSync } from 'glob';
import cleaner from 'rollup-plugin-cleaner';

const hookEntries = globSync('src/use*/index.ts').reduce((entries, file) => {
  const name = file.split('\\')[1];
  entries[`${name}/index`] = file;
  return entries;
}, {});

export default [
  {
    input: {
      index: 'src/index.ts',
      ...hookEntries,
    },
    output: [
      {
        dir: 'lib', // 指定所有生成的 chunk 被放置在哪个目录中
        entryFileNames: '[name].js', // 控制入口文件命名规则
        format: 'cjs',
        exports: 'named', // 适用于使用命名导出的情况
        preserveModules: true, // 保持目录结构
        preserveModulesRoot: 'src',
      },
      {
        dir: 'es',
        entryFileNames: '[name].js',
        format: 'esm',
        preserveModules: true, // 保持目录结构
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      cleaner({
        targets: ['./lib/', './es/'],
        verbose: true, // 显示清理日志
        cleanState: true, // 清理未使用的文件
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: {
      index: 'src/index.ts',
      ...hookEntries,
    },
    output: [
      {
        dir: 'lib',
        entryFileNames: '[name].d.ts',
        format: 'lib',
        preserveModules: true, // 保留模块结构
      },
      // {
      //     dir: 'es',
      //     entryFileNames: '[name].d.ts',
      //     format: 'esm',
      //     preserveModules: true, // 保留模块结构
      // },
    ],
    plugins: [dts()],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'nn-hooks',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // 类型文件不单独打包
      }),
      terser(),
    ],
  },
];
