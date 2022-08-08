const path = require('path');        //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('components', resolve('./src/components'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
  },
  devServer: {
    //跨域
    proxy: {
      '/api': {
        //目标路径
        target: 'http://47.107.75.215:8001',
        //允许跨域
        changOrigin: true,
        //重写路径
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

