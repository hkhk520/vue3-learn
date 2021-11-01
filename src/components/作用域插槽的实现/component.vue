
<script>
import { h } from "vue"
export default {
    render() {
        return h("div", null, [
            h("h1",null,"该组件的默认内容"),
            // 插槽的实现方法
            this.$slots.default ? this.$slots.default({name: "kai创建的"}) : h("div", null, "没有default的插槽")
        ])
    },
}
</script>