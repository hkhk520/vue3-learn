
<script>
import { h } from "vue";
import component from "./component.vue"
export default {
    render() {
        return h(component, null, {
            default: props => h("h1", null, `插槽的组件的内容：${props.name}`)
        })
    },
}
</script>