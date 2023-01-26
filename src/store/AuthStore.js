import Auth from "../services/auth/AuthService";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null}

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return Auth.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user)
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            )
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user
        }
    }
}