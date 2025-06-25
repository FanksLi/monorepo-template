import path from 'path';
import { merge } from 'webpack-merge';
import getBaseConfig from './webpack.base.js';
import { fileURLToPath } from 'url';

// 获取当前文件路径c
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

export default merge(getBaseConfig(true), {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    open: false,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    historyApiFallback: true,
    proxy: [
      {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
        },
      },
    ],
  },
});
