<template>
  <div>
    <h1 v-kai.shuai.ku="'自定义指令的值'">局部自定义指令</h1>
    <h2 v-format-time.defe="'自己的format-time'">{{time}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: +new Date()
    }
  },
  directives: {
    kai: {
      // 自定义指令的生命周期
      created(el, bindings, vnode, preNode) {
        console.log(el, bindings, vnode, preNode);
        console.log("bindings.modifiers 修饰属性 ==>",bindings.modifiers);
        console.log("bindings.value 自定义指令的值 ==>",bindings.value);
      },
    }
  }
}
</script>

<style>

</style>