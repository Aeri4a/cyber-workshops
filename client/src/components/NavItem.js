import React from "react";
import styles from "../styles/NavItem.module.scss";

function NavItem(props) {
  return <div className={styles.item}>{props.content}</div>;
}

export default NavItem;
