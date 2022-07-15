module.exports = {
	devServer: {
      // proxy: {
      // '/api': {// 匹配所有以 '/api1'开头的请求路径
      //   target: 'http://localhost:4000',// 代理目标的基础路径
      //   changeOrigin: true,
      //   ws:true,
      //   pathRewrite: {'^/api': ''},
      // },
    // }
      proxy:'http://localhost:4000',
    
  }
}