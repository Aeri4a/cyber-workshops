import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:3001/api/access/";

class AccessService {
  getAllContent() {
    return axios.get(`${URL}all`);
  }

  getUserContent() {
    return axios.get(`${URL}user`, { headers: authHeader() });
  }
}

export default new AccessService();
