import axios from "axios";

const URL = "http://localhost:3001/api/access/";

class AccessService {
  getAllContent() {
    return axios.get(`${URL}all`);
  }

  getUserContent() {
    return axios.get(`${URL}user`);
  }
}

export default new AccessService();
