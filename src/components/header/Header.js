//// tüm linklerin olduğu başlık kısmı
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
const Header = () => {

  const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  );

  return (
    <header>
      <div className={styles.header}>{logo}</div>
    </header>
  );
};

export default Header;
