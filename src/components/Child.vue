<template>
  <div>
      <p>{{title}}</p>
      <ul>
          <li v-for="(item,index) in sku" :key="index">{{item.color}} -- {{item.price}}</li>
      </ul>
      <!-- 由于computed返回的是一个ref值，所以需要使用 .value 来获取该值 -->
      <h1>{{length.value}}</h1>  
      <div id="child"></div>
  </div>
</template>

<script>
import emitter from '../utils/eventBus.js'

// 想在setup里面获取自定义插件添加的属性
import { getCurrentInstance } from "vue"

export default {
    name: "Child",
    inject: ["title", "sku", "length"],

    created() {
        // on 接受事件总线发射的事件 info 是携带的参数
        emitter.on("why", (info) => {
            console.log("why 的 info ===>",info);
        });
        // off 取消监听
        emitter.off("why", (info) => {
            console.log("why 的 info ===>",info);
        });

        // * 是监听所有事件的写法
        emitter.on("*", (type, info) => {
            console.log("* 的 info ===>",type, info);
        });

        console.log("$name ===>",this.$name);
    },
    setup() {
        // 想在setup里面获取自定义插件添加的属性
        const instance = getCurrentInstance();
        const value = instance.appContext.app.config.globalProperties.$name;
        console.log("setup $name =====>", value);
    }
}
</script>

<style>

</style>