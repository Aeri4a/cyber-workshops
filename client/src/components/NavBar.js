import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";
import NavItem from "./NavItem";

//Service
import AuthService from "../services/auth.service";

function NavBar() {
  const currentUser = AuthService.checkUserToken();
  const [activeuser, setActiveuser] = useState(Boolean(currentUser));

  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

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
            <div onClick={logout}>
              <NavItem content="Logout" />
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <NavItem content="Login" />
            </Link>
            <Link to="/signup">
              <NavItem content="Register" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
