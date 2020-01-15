 const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');

 const {resolve} = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true,
  }),

 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
 }),
//  es7装饰器
addDecoratorsLegacy(),

// 配置路径别名
addWebpackAlias({
  '$comp': resolve(__dirname, './src/components'),
  '$cont': resolve(__dirname, './src/containers'),
  '$api': resolve(__dirname, './src/api'),
  '$conf': resolve(__dirname, './src/config'),
  '$utils': resolve(__dirname, './src/utils'),
  '$redux': resolve(__dirname, './src/redux'),
})
);