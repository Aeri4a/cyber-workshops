import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";
import NavItem from "./NavItem";

function NavBar() {
  const [activeuser, setActiveuser] = useState(false);

  return (
    <nav className={styles.container}>
      <div className={styles.app_name}>
        <Link to="/">Cybero</Link>
      </div>
      <div className={styles.items}>
        {activeuser ? (
          <>
            <Link to="/profile">
              <NavItem content="Profile" />
            </Link>
            <NavItem content="Logout" />
          </>
        ) : (
          <>
            <Link to="/login">
              <NavItem content="Login" />
            </Link>
            <Link to="/signup">
              <NavItem content="Signup" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
