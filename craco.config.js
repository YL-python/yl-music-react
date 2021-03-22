const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@svgr/webpack',
        options: { babel: false, icon: true },
      },
    ],
  },
};
