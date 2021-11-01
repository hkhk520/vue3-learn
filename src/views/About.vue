<template>
  <div>
    <div class="about" @click="$store.commit('change')">AboutAboutAboutAbout ===> {{iCounter}}  kaikai{{counter}} --- {{sKaiText}}</div>
    <div>totalPricetotalPrice =>{{$store.getters.totalPrice}}</div>
    <h1>{{$store.getters.filterComputed(3)}} ------ {{scounter}}</h1>
    <h2>{{totalPrice}} --------- {{sCurrentDiscount}} ----- {{filterComputed(3)}}</h2>
  </div>
</template>

<script>
import { mapState,useStore, mapGetters } from "vuex"
import { computed } from "vue"
import useState from "../hooks/useState.js"
import {useGetters} from "../hooks/useGetters"

export default {
  name: "About",
  computed: {
    ...mapState(["counter"]),
    ...mapState({
      scounter: state => state.counter
    }),
    ...mapGetters(["totalPrice","currentDiscount"]),
    ...mapGetters({
      sCurrentDiscount: "currentDiscount"
    })
  },
  setup() {
    // 在setup里面使用vuex里面的state
    const store = useStore();
    // 一次只能拿到一个state
    const iCounter = computed(() => store.state.counter);

    // 想拿多个state
    /*
      这样拿到的是对象里面很多函数
      {
        age: ƒ mappedState(),
        counter: ƒ mappedState(),
        height: ƒ mappedState(),
        kaiText: ƒ mappedState(),
        name: ƒ mappedState()
      }
    */
    // const storeStateFns = mapState(["counter","kaiText","age","name","height"]);
    // let storeState = {};
    // // Object.keys(storeStateFns)：拿到是storeStateFns的所有key值，返回一个数组
    // Object.keys(storeStateFns).forEach(fnKey => {
    //   // const fn = storeStateFns[fnKey];
    //   const fn = storeStateFns[fnKey].bind({$store: store});
    //   storeState[fnKey] = computed(fn)
    // })
    // console.log("storeState ===================>",storeState);

    // 把上面的封装成hook，并引入使用
    const storeState = useState(["counter","kaiText","age","name","height"]);  // 数组的用法
    // 对象的用法
    const storeState1 = useState({
      sAge: state => state.age,
      sKaiText: state => state.kaiText
    });

    const storeGetters = useGetters(["totalPrice","currentDiscount","filterComputed"])

    return { 
      iCounter,
      ...storeState,
      ...storeState1,
      ...storeGetters
    }
  }
}
</script>

<style>
.about{
  user-select: none;
}
</style>
