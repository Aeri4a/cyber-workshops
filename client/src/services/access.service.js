import axios from "axios";
import authHeader from "./auth-header";
import { ipdata } from "../configS";

const URL = `${ipdata.ipadress}:8080/api/access/`;

class AccessService {
  getAllContent() {
    return axios.get(`${URL}all`);
  }

  getUserContent() {
    return axios.get(`${URL}user`, { headers: authHeader() });
  }
}

export default new AccessService();
