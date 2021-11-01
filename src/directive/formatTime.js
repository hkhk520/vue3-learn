export default function(app){
  app.directive("format-time", {
    created(el, bindings) {
      // el.textContent 拿到这个dom元素的文本内容
      console.log(el.textContent);
      console.log(bindings);

      // const time = el.textContent;
      // if(time.length < 10){
      //   time *= 1000
      // }
      if(bindings.modifiers.defe){
        el.textContent = el.textContent + "+ kai +" + bindings.value
      }
    },
  })
}