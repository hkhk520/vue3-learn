export default function(app){
    app.directive("format-price", {
        created(el, bindings) {
            el.textContent = bindings.value
        },
    })
}