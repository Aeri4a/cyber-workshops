import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:3001/api/otp/";

class OTPService {
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
