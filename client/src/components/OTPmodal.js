import React from "react";
import styles from "../styles/OTPmodal.module.scss";

function OTPmodal(props) {
  return (
    <div className={styles.background}>
      <div className={styles.window}>
        <h1 className={styles.header}>Enable 2FA</h1>
        <hr className={styles.line} />
        <p className={styles.parag}>Please scan the QR code or copy your key</p>
        <hr className={styles.line} />
        <div className={styles.qrcode}>
          <img src={props.qrcode} />
        </div>
        <div className={styles.key}>{props.base}</div>
        <hr className={styles.line} />
        <p className={styles.parag}>Activate by verifying your token:</p>
        <input
          className={styles.input}
          placeholder="token"
          type="text"
          onChange={props.actionInput}
          maxLength={6}
        />
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={props.actionClose}>
            Close
          </button>
          <button className={styles.button} onClick={props.actionConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPmodal;
