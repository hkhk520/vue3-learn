/**
 * user: kai
 * desc：这是自己封装的获取vuex里面的值的hook
 * same：相当于之前vue2 的 ...mapState() 用法
 * use：直接引入这个js文件，用法：const storeState = useState(["counter","kaiText","age","name","height"]);
 */

import { computed } from "vue";
import { mapState, useStore } from "vuex";

export default function (mapper) {
  const store = useStore()
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
  const storeStateFns = mapState(mapper);
  let storeState = {};
  // Object.keys(storeStateFns)：拿到是storeStateFns的所有key值，返回一个数组
  Object.keys(storeStateFns).forEach(fnKey => {
    // const fn = storeStateFns[fnKey];
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);    // 这里的计算属性也是这样拿到的 this.$store.state
  })

  return storeState
}