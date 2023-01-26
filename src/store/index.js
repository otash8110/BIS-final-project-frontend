import { createStore } from 'vuex'
import { auth } from "./AuthStore";

export default createStore({
  modules: {
    auth
  }
})
