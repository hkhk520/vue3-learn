class Dep{
    constructor(){
        this.subscribers = new Set()
    }

    depend(){
        if(activeEffect){
            this.subscribers.add(activeEffect)
        }
    }

    notify(){
        this.subscribers.forEach(effect => {
            effect();
        })
    }
}

let activeEffect = null;
function watchEffect(effect) {
    activeEffect = effect;
    // watchEffect 默认第一次要执行
    effect();
    activeEffect = null;
}

const targetMap = new WeakMap();  // 弱引用的map
function getDep(target, key) {
    let depsMap = targetMap.get(target);
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }

    // 取出具体的dep对象
    let dep = depsMap.get(key);

    if(!dep){
        dep = new Dep();
        depsMap.set(key, dep)
    }

    return dep;
}

// vue2 对 raw 进行数据劫持
function reactive(raw) {
    Object.keys(raw).forEach(key => {
        const dep = getDep(raw, key);
        let value = raw[key];

        Object.defineProperty(raw, key, {
            get(){
                dep.depend();
                return value;
            },
            set(newValue){
                if(value !== newValue){
                    value = newValue;
                    // 通知所有的依赖
                    dep.notify();
                }
            }
        })
    })

    return raw;
}

const info = reactive({name: 'kai', age: 18})
const foo = reactive({ height: 180 })

watchEffect(function(){
    console.log(info.age * 2, info.name);
})

watchEffect(function(){
    console.log(info.age * info.age);
})

watchEffect(function () {
    console.log(foo.height);
})

foo.height++
