import { createStore } from 'vuex'

export default createStore({
  state: {
    counter: 0,
    kaiText: "kaiText111111111111",
    age: 18,
    name: "kai",
    height: 180,
    books: [
      {name: "js", price: 200, count: 4},
      {name: "vue", price: 300, count: 7},
      {name: "node", price: 400, count: 3},
    ],
    discount: 0.9
  },
  // getters 相当于vuex里面的计算属性
  getters: {
    totalPrice(state, getters){
      let totalPrice = 0;
      state.books.forEach(item => {
        totalPrice += item.price
      });

      // 通过 getters 拿到getters里面的其他属性
      return totalPrice * getters.currentDiscount;
    },
    currentDiscount(state){
      return state.discount * 8.9
    },
    filterComputed(state){
      return payload => {
        let totalPrice = 0;
        state.books.forEach(item => {
          if(item.count > payload){
            totalPrice += item.price
          }
        });

        return totalPrice;
      }
    }
  },
  mutations: {
    change(state){
      state.counter++
    }
  },
  actions: {
  },
  modules: {
  }
})
