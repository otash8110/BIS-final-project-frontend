import axios from "axios";
import authHeader from "../auth/AuthHeader";
import { API_URL } from "../Utils";

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

    GetUserByEmail(email) {
        return axios.get(API_URL + "User/" + email, {
            headers: authHeader()
        })
    }
}


export default new UserService();