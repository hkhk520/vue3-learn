<template>
  <div>
      <button @click="send">点击发射事件总线</button>
  </div>
</template>

<script>
import emitter from '../utils/eventBus.js'
export default {
    name: "About",
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        send(){
            // 发射一个事件总线的事件，格式 emitter.emit("事件的名称", 携带的参数) ，可在任意地方接受这个事件
            emitter.emit("why", { name: 'why method', age: 520 })
            emitter.emit("copy", { name: 'copy method', age: 888 })
        }
    },

    // 由于setup不能使用this，但又想使用props里面的属性，就需要使用setup的两个参数
    // setup(props, { attrs, slot, emit }) {  // 可以把context解构出来 { attrs, slot, emit }
    setup(props, context) {  
        // props：就是该组件的props属性
        // context：是一个对象{ attrs, slot, emit }， attrs：非props属性；slot：该组件的插槽；emit：发射事件的函数
        console.log("props.title ===>",props.title);
        console.log("context ===>",context);
    }
}
</script>

<style>

</style>