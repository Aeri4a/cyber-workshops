import React from "react";
import styles from "../styles/OTPafterlogin.module.scss";

function OTPafterlogin(props) {
  return (
    <form className={styles.container} method="POST" onSubmit={props.sumbit}>
      <h2 className={styles.header}>Verify your token</h2>
      <input
        className={styles.input}
        name="token"
        onChange={props.change}
        placeholder="token"
      ></input>
      <button className={styles.button}>Verify</button>
    </form>
  );
}

export default OTPafterlogin;
