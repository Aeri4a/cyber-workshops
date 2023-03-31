import React from "react";
import { Navigate } from "react-router-dom";
import styles from "../styles/Profile.module.scss";

//Service
import AuthService from "../services/auth.service";

function Profile() {
  const currentUser = AuthService.checkUserToken();

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Profile</h2>
        <div className={styles.tile}>
          <p className={styles.paragh}>Id: {currentUser.id}</p>
          <p className={styles.paragh}>Username: {currentUser.username}</p>
          <p className={styles.paragh}>
            Token: {currentUser.accessToken.slice(0, 20)}
          </p>
        </div>
        <div className={styles.tile}>
          <p className={styles.paragh}>(TwoStepAuth)</p>
        </div>
      </div>
    );
  }
}

export default Profile;
