
<script>
// import { h } from "vue"
import { h, ref } from "vue"
export default {
    // data() {
    //     return { count: 0 }
    // },
    setup() {
        const count = ref(0);
        // return {
        //     count
        // }

        return () => {
            return h("div", { class: "render-h" }, [
                h("h1", null, `当前的计数${count.value}`),
                h("button", { style: "color: red", onclick: () => count.value++ }, "+1"),
                h("button", { onclick: () => count.value-- }, "-1")
            ])
        }
    },
    // render() {
    //     // h(标签名, 标签的属性或方法, 标签的内容或子组件)
    //     return h("div", { class: "render-h" }, [
    //         h("h1", null, `当前的计数${this.count}`),
    //         h("button", { style: "color: red", onclick: () => this.count++ }, "+1"),
    //         h("button", { onclick: () => this.count-- }, "-1")
    //     ])
    // },
}
</script>