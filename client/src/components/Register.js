import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Forms.module.scss";
import FormInput from "./FormInput";

//Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Service
import AuthService from "../services/auth.service";

function Register() {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      errorMessage: "Passwords don't match!",
      label: "Confirm password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.register(values.username, values.password)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        setInfo(error.response.data);
      });
  };

  //Provide results for user
  useEffect(() => {
    if (info.code) {
      toast.success(info.message);
      toast.success("Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 6000);
    } else toast.error(info.message);
  }, [info]);

  return (
    <div className={styles.container}>
      <form className={styles.mainForm} method="POST" onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <h2>Make an account</h2>
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                focusMode={true}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
        </div>
        <button className={styles.button}>Register</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5500}
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
