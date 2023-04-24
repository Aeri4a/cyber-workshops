import axios from "axios";
import authHeader from "./auth-header";
import { ipdata } from "../configS";

const URL = `${ipdata.ipadress}:8080/api/otp/`;

class OTPService {
  validate(tokenValue, username) {
    return axios
      .post(`${URL}validate`, { token: tokenValue, userName: username })
      .then((response) => {
        if (response.data.accessToken)
          localStorage.setItem("userData", JSON.stringify(response.data));

        return response;
      });
  }

  generate() {
    return axios.post(`${URL}generate`, {}, { headers: authHeader() });
  }

  verify(tokenValue) {
    return axios.post(
      `${URL}verify`,
      { token: tokenValue },
      { headers: authHeader() }
    );
  }

  disable() {
    return axios.post(`${URL}disable`, {}, { headers: authHeader() });
  }
}

export default new OTPService();
