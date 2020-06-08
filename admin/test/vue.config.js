const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction, 'isProductionisProductionisProduction')
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */

  // plugins: [
  //   new CompressionPlugin({
  //     test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
  //     threshold: 10240,
  //     deleteOriginalAssets: false
  //   })
  // ],

  // 项目部署的基础路径

  // 我们默认假设你的应用将会部署在域名的根部,

  // 例如 https://www.my-app.com/

  // 如果你的应用部署在一个子路径下，那么你需要在这里

  // 指定子路径。比如将你的应用部署在

  // https://www.foobar.com/my-app/

  // 那么将这个值改为 '/my-app/'

  lintOnSave: true,

  publicPath: "./", //根域上下文目录  './'这样所有的资源都会被链接为相对路径

  outputDir: "./build", //build时构建文件的目录 构建时传入 --no-clean 可关闭该行为

  // assetsDir: 'assets', // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录

  lintOnSave: process.env.NODE_ENV !== "production", // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)

  runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖// 是否使用包含运行时编译器的 Vue 构建版本

  filenameHashing: false, // 默认在生成的静态资源文件名中包含hash以控制缓存

  transpileDependencies: [
    /* string or regex */
  ], // Babel 显式转译列表

  productionSourceMap: false, // 是否为生产环境构建生成sourceMap? 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建

  // 调整内部的webpack配置.对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {}, // webpack链接API，用于生成和修改webapck配置，

  configureWebpack: () => {}, // webpack配置，值位对象时会合并配置，为方法时会改写配置

  css: {
    extract: true,

    sourceMap: false,

    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: []
      }
    }
  },

  devServer: {
    open: true,

    disableHostCheck: false,

    host: "0.0.0.0",

    port: 8080,

    https: false,

    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy

    proxy: {
      "/match": {
        // 匹配所有以 '/api' 开头的请求路径
        target: "https://preview.kohsocialapp.qq.com:10009", // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径： 去掉路径中开头的'/api'
          "^/api": ""
        }
      }
    }
    // string | Object

    // before: app => {}
  },

  parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译

  pwa: {}, // 单页插件相关配置

  pluginOptions: {},
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }))
    }
  },
};