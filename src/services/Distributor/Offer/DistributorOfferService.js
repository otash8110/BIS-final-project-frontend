import axios from "axios";
import authHeader from "../../auth/AuthHeader";
import { API_URL } from "../../Utils";

class DistributorOfferService {
  CreateOffer(offer) {
    return axios.post(API_URL + "Offer", {
        ...offer
    }, {
      headers: authHeader(),
    });
  }
}

export default new DistributorOfferService();
