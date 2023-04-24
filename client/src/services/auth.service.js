import axios from "axios";
import { ipdata } from "../configS";

const URL = `${ipdata.ipadress}:8080/api/auth/`;

class AuthService {
  register(username, password) {
    return axios.post(`${URL}register`, { username, password });
  }

  login(username, password) {
    return axios
      .post(`${URL}login`, { username, password })
      .then((response) => {
        if (response.data.accessToken)
          localStorage.setItem("userData", JSON.stringify(response.data));

        return response;
      });
  }

  logout() {
    localStorage.removeItem("userData");
  }

  checkUserToken() {
    return JSON.parse(localStorage.getItem("userData"));
  }
}

export default new AuthService();
