import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";

//Service
import AuthService from "../services/auth.service";
import AccessService from "../services/access.service";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    AccessService.getUserContent()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        //Invalid token
        console.log("No access", error.response);
        if (
          error.response &&
          (error.response.status === 403 || error.response.status === 401)
        ) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Profile</h2>
      <div className={styles.tile}>
        <p className={styles.paragh}>Id: {data.userId}</p>
        <p className={styles.paragh}>Username: {data.userName}</p>
      </div>
      <div className={styles.tile}>
        <p className={styles.paragh}>(TwoStepAuth)</p>
      </div>
    </div>
  );
}

export default Profile;
