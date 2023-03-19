import React, { useState } from "react";
import styles from "../styles/Register.module.scss";

//Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  return (
    <div className={styles.container}>
      <h2>Make an account</h2>
      <form method="POST">
        <p className={styles.parg}>Username</p>
        <input className={styles.inputs} type="text" />
        <hr />
        <p className={styles.parg}>Password</p>
        <input className={styles.inputs} type="password" />
        <hr />
        <p className={styles.parg}>Confirm password</p>
        <input className={styles.inputs} type="password" />
        <input
          className={styles.button}
          type="submit"
          value="Register"
          onClick={(e) => {
            toast.success("Test");
            e.preventDefault();
          }}
        />
      </form>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Register;
