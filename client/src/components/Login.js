import React, { useState } from "react";
import styles from "../styles/Forms.module.scss";
import FormInput from "./FormInput";

//Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "login",
      type: "text",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.mainForm} method="POST" onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <h2>Login to your account</h2>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                focusMode={false}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
        </div>
        <button>Login</button>
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

export default Login;
