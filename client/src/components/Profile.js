import React, { useState } from "react";
import styles from "../styles/Profile.module.scss";

function Profile() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Profile</h2>
      <div className={styles.tile}>info1</div>
      <div className={styles.tile}>info2</div>
    </div>
  );
}

export default Profile;
