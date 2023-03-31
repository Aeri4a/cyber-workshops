import axios from "axios";

const URL = "http://localhost:3001/api/auth/";

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

        return response.data;
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
