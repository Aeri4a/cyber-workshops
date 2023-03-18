import React from "react";
import styles from "../styles/Home.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <p>
        Welcome to my specially prepared <b>Cybero</b> page!
      </p>
      <p>
        We will test how Authentication and Authorization system is working.
      </p>
    </div>
  );
}

export default Home;
