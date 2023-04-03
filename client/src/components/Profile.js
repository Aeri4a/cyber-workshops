import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";

//Service
import AuthService from "../services/auth.service";
import AccessService from "../services/access.service";
import OTPService from "../services/otp.service";

//OTP
import OTPmodal from "./OTPmodal";
import QRCode from "qrcode";

//Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  //const [modal, setModal] = useState(0);
  const [genotp, setGenotp] = useState({ modal: 0 });
  const [refresh, setRefresh] = useState(0);

  const generateOTP = () => {
    OTPService.generate()
      .then((response) => {
        QRCode.toDataURL(response.data.otpauth_url).then((data) => {
          setGenotp({ modal: 1, ...response.data, qrcode: data });
        });
      })
      .catch((error) => {
        console.log("Fail while generate", error.response);
      });
  };

  const tokenInput = (e) => {
    setGenotp({ ...genotp, token: e.target.value });
  };

  const confirmOTP = () => {
    OTPService.verify(genotp.token)
      .then((response) => {
        if (response.data.otpVerified) {
          console.log(response.data.otpVerified);
          toast.success("Success! 2FA has been enabled!");

          setTimeout(() => {
            setGenotp({ ...genotp, modal: 0 });
          }, 2000);

          getData();
        }
      })
      .catch((error) => {
        toast.error("Fail to activate 2FA!");
      });
  };

  const disableOTP = () => {
    OTPService.disable()
      .then((respone) => {
        toast.success("2FA deactivated.");
        getData();
      })
      .catch((error) => {
        toast.error("Fail to deactivate 2FA!");
      });
  };

  const closeModal = () => {
    setGenotp({ ...genotp, modal: 0 });
  };

  const getData = () => {
    AccessService.getUserContent()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        //Invalid token
        console.log("No access", error.response);
        if (error.response) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.header}>Profile</h2>
        <div className={styles.tile}>
          <h3 className={styles.tileHeader}>User info</h3>
          <p className={styles.paragh}>Id: {data.userId}</p>
          <p className={styles.paragh}>Username: {data.userName}</p>
        </div>
        <div className={styles.tile}>
          <h3 className={styles.tileHeader}>Two-Factor Authentication</h3>
          <p className={styles.paragh}>
            {data.otpEnabled ? (
              <button className={styles.otpbtn} onClick={disableOTP}>
                Disable 2FA
              </button>
            ) : (
              <button className={styles.otpbtn} onClick={generateOTP}>
                Enable 2FA
              </button>
            )}
          </p>
        </div>
      </div>
      {genotp.modal ? (
        <OTPmodal
          actionClose={closeModal}
          actionConfirm={confirmOTP}
          base={genotp.base32}
          qrcode={genotp.qrcode}
          actionInput={tokenInput}
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Profile;
