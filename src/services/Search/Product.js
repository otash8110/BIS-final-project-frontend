import axios from "axios";
import authHeader from "../auth/AuthHeader";
import { API_URL } from "../Utils";

class ProductSearch {
  GetProductsByName(name) {
    return axios.get(API_URL + "Search/Products", {
      headers: authHeader(),
      params: {
        productName: name
      }
    });
  }

  GetAllProducts() {
    return axios.get(API_URL + "Search/GetAllProducts", {
        headers: authHeader(),
    })
  }
}

export default new ProductSearch();
