import axios from "axios";

const API_URL = '';

class Auth {
    login(user) {
        return axios.post(API_URL + "login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    register(user) {
        return axios.post(API_URL + 'register', {
            email: user.email,
            password: user.password,
            role: user.role
        });
    }
}


export default new Auth();