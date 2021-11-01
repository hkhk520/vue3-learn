<template>
  <div>
    <!-- 在template中使用ref对象里面的值时，Vue会自动添加 .value 所以直接写count就行 -->
    <div @click="clickHandel">{{count}}</div> 
    <ul>
      <li v-for="(item,index) in obj.stuInfo" :key="index">{{item.name}} -- {{item.age}}</li>
    </ul>
    <p>{{state1}}</p>
    <p>{{count1.b.c.d.s}}</p>
    <button @click="change">点我</button>

    <p>{{objState.name}} -- {{objState.age}}</p>
    <p>{{markState.name}}</p>
    <p>{{toRefValue}}</p>
    <p>{{toRefsValue.name.value}} -{{toRefsValue.age.value}}</p>
    <p>{{customRefVaule}}</p>
    <button @click="objStateChange">改变我</button>

    <!-- Vue3 中如何获取ref DOM元素 -->
    <div ref="meBox">me me</div>

    <p>{{readonlyValue.title}}</p>

    <MuiltAttrs class="kaikai" id="index" attr="lailai"></MuiltAttrs>
    <button @click="addInfo">+info</button>
    <p>{{name}}</p>
    <p>{{fullName}}</p>
    <render-h></render-h>
    <slot-h></slot-h>
    <custom-bind></custom-bind>

    <div id="key"></div>
    <!-- to：指定将teleport里面的内容移到的目标元素，可以使用选择器 -->
    <!-- disabled：是否禁用teleport的功能 -->
    <!-- <teleport to='#key' disabled> -->
    <teleport to='#teleport'>
      <h1 v-format-price="'kaikai teleport teleport'">teleport</h1>
    </teleport>

    <div @click="$router.push({name: 'About'})">Go To About</div>

    <router-view></router-view>
  </div>
</template>

<script>
// setup函数需要保存变量，ref一般是用于简单的数据类型 ，会递归监听，缺点：耗性能
// reactive一般用于复杂的数据类型，会递归监听，缺点：耗性能
// shallowRef, shallowReactive 不会递归监听
/*
  应用场景：
  一般情况下我们使用 ref 和 reactive 即可
  只有在需要监听的数据量比较大的时候，我们才使用shallowRef, shallowReactive  
*/

// readonly：创建一个只读的变量，是递归监听的, 
// shallowReadonly：创建一个只读的变量，不是递归监听的, 
// isReadonly：判断是否为只读变量
import { ref, reactive, isRef, isReactive, shallowRef, shallowReactive, triggerRef, toRaw, markRaw, toRef, toRefs, customRef, onMounted, readonly, shallowReadonly, isReadonly, computed } from 'vue';

import { useRoute } from "vue-router"

import MuiltAttrs from './components/MuiltAttrs.vue';
import renderH from "./components/render函数的h函数实现的计数器.vue";
import slotH from "./components/作用域插槽的实现/index.vue";
import customBind from "./components/局部自定义指令.vue";

// 自定义一个customRef方法，返回一个ref对象，可以控制依赖追踪和触发响应
function myRef(value){
  return customRef((track, trigger) => {
    return {
      get(){
        track();  // 告诉Vue这个数据是需要追踪变化的
        console.log("get", value);
        return value;
      },
      set(newValue){
        console.log("set", newValue);
        value = newValue;
        trigger();   // 告诉Vue触发界面更新数据
      }
    }
  })
}

export default {
  name: 'App',
  data() {
    return {
      info: [
        {name: 'kai', age: 18},
        {name: 'cal', age: 20},
      ]
    }
  },
  components: {
    MuiltAttrs,
    renderH,
    slotH,
    customBind
  },

  // 跨组件的使用方法
  // provide: {
  //   title: "跨组件的使用方法",
  //   sku: [
  //     {color: 'red', price: 520},
  //     {color: 'green', price: 555}
  //   ]
  // },
  // 如果想在provice里面使用data里面的数据，就需要写成函数的返回值形式
  provide(){
    return {
      title: "跨组件的使用方法",
      sku: [
        {color: 'red', price: 520},
        {color: 'green', price: 555}
      ],
      length: computed(() => this.info.length)  // 想provice里面的属性变成响应式，需要使用computed来实现
    }
  },

  methods: {
    addInfo(){
      this.info.push({name: "love you", age: 520});
      console.log("this.info ===>",this.info);
    }
  },

  // setup函数是组合API的入口函数，这个的作用主要是将数据和方法写在一起，方便整理和查看，解决了Vue2的数据和方法逻辑分散的问题
  // setup函数是在beforeCreate 和 created 之间触发的，即还没触发 created 生命周期，所以不能使用  this 
  setup() {
    // 在router4. 的版本可以在setup拿到useRoute，相当于 $route
    const route = useRoute();
    console.log("route =========>", route);

    // setup函数是在beforeCreate 和 created 之间触发的，即还没触发 created 生命周期，所以不能使用  this
    console.log("this =>>",this);  // vue3为了防止报错，直接将setup函数里面的this设置为undefined

    // ref一般是用于简单的数据类型   底层原理：ref(18)  -->  reactive({ value: 18 })
    let count = ref(0);

    // 底层原理：shallowRef(18)  -->  shallowReactive({ value: 18 })
    let count1 = shallowRef({
      a: "a",
      b: {
        c: {
          d: {
            s: 852032
          }
        }
      }
    });
    let count2 = shallowReactive({
      a: {
        b: {
          c: {
            d: {
              s: 852032
            }
          }
        }
      }
    });

    // reactive一般用于复杂的数据类型 ，reactive的参数必须是个对象（obj 或 arr）
    const obj = reactive({
      stuInfo: [
        {
          name: 'zs',
          age: 20
        },
        {
          name: 'ls',
          age: 21
        },
        {
          name: 'ww',
          age: 22
        }
      ]
    });

    let firstName = ref("kai");
    let lastName = ref("huang");
    // let fullName = computed(() => firstName.value + " " + lastName.value);   // computed 返回的是一个ref对象 ，这样写不能修改其value值，因为是一个readonly的限制
    let fullName = computed({
      get: () => firstName.value + " " + lastName.value,
      set: (newValue) => firstName.value = newValue
    })

    function clickHandel(){
      console.log("count ==>",count);  // count是一个对象

      count.value++  //  count是一个对象,对象里面的value是对应的值

      fullName.value = "kasmldask";  // 不能直接修改computed 返回的是一个ref对象，只能通过写get 和 set 来修改
      // console.log("fullName =========>",fullName.value);
    }

    // 如果reactive()里面的参数是简单类型，则修改不会响应式，必须是object或arr，才会响应式
    let state1 = reactive([2222,2333,666]);
    function change(){
      state1[0] = 2000;
      console.log("state1 ==>",state1);

      // 判断数据是否ref或者reactive类型
      console.log("isRef(count) ==>",isRef(count));
      console.log("isReactive(count) ==>",isReactive(obj));

      count1.value.b.c.d.s = "520520hk";
      // 当更改shallowRef的数据，页面无法响应时，可用 triggerRef( ) 使其响应
      triggerRef(count1);
    }

    
    let objValue = {
      name: "kai",
      age: 20
    }
    let objState = reactive(objValue);
    console.log(objValue === objState);   // false
    // toRaw 就是把reactive里面的对象还原成原来的对象，即objValue
    let objValue1 = toRaw(objState);
    console.log(objValue === objValue1);   // true

    let markValue = {
      name: "markValue"
    }
    markValue = markRaw(markValue);  // markRaw 就是取消该对象的追踪，让改变reactive的值后，不会进行页面的响应式，但会更改reactive里面的对象的值
    let markState = reactive(markValue);

    let markValue1 = {
      name: "markValue1"
    }
    // toRef 就是取某个对象里面的某个属性，当改变toRefValue.value的值时，原来的对象的数据都会改变，但不会响应式
    let toRefValue = toRef(markValue1, "name");  // toRef(对象名, 对象里面的某个key值)

    let markValue2 = {
      name: "markValue2",
      age: 20
    }
    // toRefs 就是对某个对象，当改变值时，原来的对象的数据都会改变，但不会响应式
    let toRefsValue = toRefs(markValue2);
    // 也可以解构出reactive对象的值出来，解构出来的值进行修改，也是响应式的
    let { name } = toRefs(markState);

    let customRefVaule = myRef(18);

    function objStateChange(){
      objValue.name = "kaihuang";
      console.log(objValue);
      console.log(objState);

      markState.name = "no-to-chang";
      console.log("markState =>",markState);

      toRefValue.value = "to-change-toRef";
      console.log(markValue1,toRefValue);

      // 当改变值时，原来的对象的数据都会改变，但不会响应式
      toRefsValue.name.value = "lllll";
      toRefsValue.age.value = 520;
      name = "kiakia"
      console.log(markValue2,toRefsValue);

      customRefVaule.value = 520520;
    }

    // Vue3 中如何获取ref DOM元素 
    let meBox = ref(null);

    // 在 setup 里面监听 生命周期函数
    onMounted(() => {
      console.log("onMounted", meBox.value);
    });

    console.log("meBox",meBox);  // 比生命周期onMounted先执行

    let readonlyValue = readonly({
      title: "readonly",
      person: {
        name: "lll",
        age: 18
      }
    });

    let shallowReadonlyValue = shallowReadonly({
      title: "readonly",
      person: {
        name: "lll",
        age: 18
      }
    });

    console.log(isReadonly(shallowReadonlyValue));
    console.log(isReadonly(readonlyValue));

    // Vue3怎么实现响应式的
    let vue3Obj = {name: "proxy", age: 520};
    let stateProxy = new Proxy(vue3Obj, {
      get(vue3Obj, key){
        console.log("vue3Obj =====>",vue3Obj);
        console.log("key =====>",key);
        return vue3Obj[key];
      },
      set(vue3Obj, key, value){
        console.log("vue3Obj ====>",vue3Obj);
        console.log("key ====>",key);
        console.log("value ====>",value);
        vue3Obj[key] = value;
        return true;
      }
    });

    // 当获取stateProxy.name时，就会调用get方法
    console.log("stateProxy.name ++++>",stateProxy.name);
    stateProxy.name = "重新设置"

    // 组合中变量和方法想暴露给外界，通过 return { xxx, xxx } 的形式
    return { count,clickHandel,obj,state1,change,count1,count2,objState,objStateChange,markState,toRefValue,toRefsValue,customRefVaule,meBox,readonlyValue,shallowReadonlyValue,name,fullName }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
