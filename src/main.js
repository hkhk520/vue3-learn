import { createApp } from 'vue'
import App from './App.vue'
import registerDirectives from './directive/index'
// 自定义插件
import plugins_object from './plugins/plugins_object'
import plugins_function from './plugins/plugins_function'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)

registerDirectives(app)

// 自定义插件
app.use(plugins_object)
app.use(plugins_function)

app.mount('#app')
