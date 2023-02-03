import { createStore } from 'vuex'
import { auth } from "./AuthStore";
import { signalr } from "./SignalRStore";

export default createStore({
  modules: {
    auth,
    signalr
  }
})
