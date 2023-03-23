import axios from "axios";
import authHeader from "../auth/AuthHeader";

const API_URL = 'https://localhost:7083/api/v1/';

class UserService {
    GetUser() {
        return axios.get(API_URL + "User", {
            headers: authHeader()
        })
    }

    UpdateUser(user) {
        return axios.put(API_URL + "User", {
            email: user.email,
            name: user.name,
            surname: user.surname,
            companyName: user.companyName,
        }, {
            headers: authHeader()
        })
    }
}


export default new UserService();