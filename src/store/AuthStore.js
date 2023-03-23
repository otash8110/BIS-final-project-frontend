import UserService from "@/services/User/UserService";
import Auth from "../services/auth/AuthService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user, role: null }
  : { status: { loggedIn: false }, user: null, role: null  };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return Auth.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },

    register({ commit }, user) {
      return Auth.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerSuccess");
          return Promise.reject(error);
        }
      );
    },

    logout({ commit }) {
      Auth.logout();
      commit("logout");
    },

    GetUserRole({ commit }) {
      UserService.GetUser().then(res => {
        console.log(res.data);
        commit("role", res.data.role);
      });

    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    role(state, role) {
      state.role = role;
    }
  },
};
