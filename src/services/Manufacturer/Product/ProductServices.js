import axios from "axios";
import authHeader from "../../auth/AuthHeader";
import { API_URL } from "../../Utils";


class ProductServices {
    CreateProduct(product) {
        return axios.post(API_URL + "Product", {
            name: product.name,
            description: product.description,
        }, {
            headers: authHeader()
        })
    }

    GetProducts() {
        return axios.get(API_URL + "Product", {
            headers: authHeader()
        })
    }
}

export default new ProductServices();