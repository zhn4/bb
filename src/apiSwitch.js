// 切换开发环境/生产环境的api
module.exports = function apiSwitch() {
  if(process.env.NODE_ENV === 'development') {
    // return 'http://192.168.1.130:8000'
    return 'http://192.168.1.104'
  }else {
    return 'http://192.168.1.104'
  }
}
