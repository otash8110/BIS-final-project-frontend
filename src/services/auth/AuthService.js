import axios from "axios";

const API_URL = 'https://localhost:7083/api/v1/';

class Auth {
    login(user) {
        return axios.post(API_URL + "Auth/login", {
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
        return axios.post(API_URL + 'Auth/register', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            role: user.role
        });
    }

    logout() {
        localStorage.removeItem('user');
    }
}


export default new Auth();