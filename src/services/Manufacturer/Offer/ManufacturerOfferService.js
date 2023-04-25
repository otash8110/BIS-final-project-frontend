import axios from "axios";
import authHeader from "../../auth/AuthHeader";
import { API_URL } from "../../Utils";

class ManufacturerOfferService {
  GetManufacturerOffers() {
    return axios.get(API_URL + "Manufacturer/Offers",{
      headers: authHeader(),
    });
  }
}

export default new ManufacturerOfferService();
