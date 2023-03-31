import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Forms.module.scss";
import FormInput from "./FormInput";

//Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Service
import AuthService from "../services/auth.service";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "Username",
      //pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      //pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login(values.username, values.password)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        setInfo(error.response.data);
      });
  };

  useEffect(() => {
    if (info.code) {
      toast.success("Login success!");
      toast.success("Redirecting to profile page...");
      setTimeout(() => {
        navigate("/profile");
        window.location.reload();
      }, 2000);
    } else toast.error(info.message);
  }, [info]);

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
                focusMode={true}
                value={values[input.name]}
                onChange={onChange}
              />
            );
          })}
        </div>
        <button className={styles.button}>Login</button>
      </form>
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
    </div>
  );
}

export default Login;
