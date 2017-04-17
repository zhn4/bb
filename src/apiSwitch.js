// 切换开发环境/生产环境的api
module.exports = function apiSwitch() {
  if(process.env.NODE_ENV === 'development') {
    return '//192.168.1.84:8000'
  }else {
    return '//wait to change product api'
  }
}
