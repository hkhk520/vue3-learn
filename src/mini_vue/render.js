const h = (tag, props, children) => {
    return {
        tag,
        props,
        children
    }
}

const mount = (vnode, container) => {
    // 创建真实的dom，并在vnode保留el元素
    const el = vnode.el = document.createElement(vnode.tag);

    // 处理props
    if(vnode.props){  // 如果有props属性
        for(const key in vnode.props){  // vnode.props是个对象，进行遍历
            const value = vnode.props[key];

            if(key.startsWith("on")){ // 如果该属性是function的处理
                el.addEventListener(key.slice(2).toLowerCase(), value);   // onClick
            }else{
                el.setAttribute(key, value)
            }
        }
    }

    // 处理children
    if(vnode.children){
        if(typeof vnode.children === "string"){
            el.textContent = vnode.children
        }else{
            vnode.children.forEach(item => {
                mount(item, el)
            })
        }
    }

    // 把生成的真实dom挂载到目标位置
    container.appendChild(el)
}

// 相当于进行diff算法的操作
const patch = (n1, n2) => {
    // 1、如果标签名不一样的处理方式
    if(n1.tag !== n2.tag){
        const n1ElParent = n1.el.parentElement;
        n1ElParent.removeChild(n1.el);
        mount(n2, n1ElParent)
    }

    // 2、如果标签名一样的处理方式

    // 获取element元素，并给n2添加属性el
    const el = n2.el = n1.el;

    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // 处理newProps有的新属性
    for(const key in newProps){
        const oldValue = oldProps[key];
        const newValue = newProps[key];
        if(oldValue !== newValue){
            if(key.startsWith("on")){ // 如果该属性是function的处理
                el.addEventListener(key.slice(2).toLowerCase(), newValue);   // onClick
            }else{
                el.setAttribute(key, newValue)
            }
        }
    }

    // 删除oldProps有的，但是newProps没有的属性
    for(const key in oldProps){
        if(key.startsWith("on")){ // 如果该属性是function的处理
            const value = oldProps[key];
            el.removeEventListener(key.slice(2).toLowerCase(), value);   // onClick
        }

        if(!(key in newProps)){
            el.removeAttribute(key)
        }
    }

    // 处理children
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];

    if(typeof newChildren === "string"){
        if(typeof oldChildren === "string"){
            if(oldChildren !== newChildren){
                el.textContent = newChildren
            }
        }else{
            el.innerHTML = newChildren
        }
    }else{
        if(typeof oldChildren === "string"){
            el.innerHTML = "";  // 先把旧的文本内容清除掉
            // newChildren是数组，每个值都是一个vnode
            newChildren.forEach(item => {
                // 每一个vnode都转化成真实dom
                mount(item, el)
            })
        }else{
            // oldChildren: [v1, v2, v3]
            // newChildren: [v1, v2, v3, v4, v5]
            
            // 拿到公共的最小长度
            const commonLength = Math.min(oldChildren.length, newChildren.length);

            // 共同长度的进行diff算法比较操作
            for(let i = 0; i < commonLength; i++){
                patch(oldChildren[i], newChildren[i]);
            }

            // 如果新的vnode比较多，需要进行添加操作
            if(newChildren.length > oldChildren.length){
                newChildren.slice(commonLength).forEach(item => {
                    mount(item, el)
                })
            }

            // 如果新的vnode比较少，需要对oldChildren进行移除操作
            if(newChildren.length < oldChildren.length){
                oldChildren.slice(commonLength).forEach(item => {
                    el.removeChild(item.el)
                })
            }
        }
    }
}