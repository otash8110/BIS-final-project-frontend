import axios from "axios";
import authHeader from "../../auth/AuthHeader";
import { API_URL } from "../../Utils";

class DistributorProductService {
  GetProduct(id) {
    return axios.get(API_URL + "Distributor/GetProduct", {
      headers: authHeader(),
      params: {
        id,
      },
    });
  }
}

export default new DistributorProductService();
