import React from "react";
import { Navigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";

//Service
import AuthService from "../services/auth.service";
import AccessService from "../services/access.service";

function Profile() {
  const isLogin = AccessService.getUserContent();
  console.log(isLogin);

  if (!isLogin) return <Navigate to="/login" />;
  else {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Profile</h2>
        <div className={styles.tile}>
          <p className={styles.paragh}>Id: {isLogin.userId}</p>
          <p className={styles.paragh}>Username: {isLogin.userName}</p>
          <p className={styles.paragh}>Token: -</p>
        </div>
        <div className={styles.tile}>
          <p className={styles.paragh}>(TwoStepAuth)</p>
        </div>
      </div>
    );
  }
}

export default Profile;
