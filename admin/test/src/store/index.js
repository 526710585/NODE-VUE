import Vuex from 'vuex'
import Vue from 'vue'

//挂载Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName:''
  },
  mutations: {
    saveUserName(state,userName){
      state.userName = userName;
    }
  }
})

export default store