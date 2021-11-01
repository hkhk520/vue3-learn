<template>
  <div>
      <!-- 手动继承非prop属性的写法 -->
      <!-- :class="$attrs.class"  表示继承该组件的class属性写法 -->
      <h1 :class="$attrs.class">520</h1>
      <!-- v-bind="$attrs" 表示继承该组件的所有非prop属性 -->
      <h2 v-bind="$attrs">888</h2>

      <Child></Child>
      <About title="传递的prop"></About>
  </div>
</template>

<script>
import Child from './Child.vue'
import About from './About.vue'
export default {
    name: "MuiltAttrs",
    // 是否继承组件的非prop属性到该组件的根节点，默认会继承到该组件的根节点
    inheritAttrs: false,
    props: {

    },
    components: {
      Child,
      About
    }
}
</script>

<style>

</style>