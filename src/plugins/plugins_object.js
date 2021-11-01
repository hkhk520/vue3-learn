export default {
  install(app){
    // 自定义插件里面添加全局属性
    app.config.globalProperties.$name = "codeKai" 
  }
}