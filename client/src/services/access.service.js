import axios from "axios";

const URL = "http://localhost:3001/api/access/";

class AccessService {
  getAllContent() {
    return axios.get(`${URL}all`);
  }

  async getUserContent() {
    return axios.get(`${URL}user`, {
      headers: {
        "x-access-token": localStorage.getItem("userData"),
      },
    });
  }
}

export default new AccessService();
