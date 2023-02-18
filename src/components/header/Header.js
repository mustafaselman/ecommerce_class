//// tüm linklerin olduğu başlık kısmı
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
const Header = () => {
  // responsive de yan menüyü(nav) gizleme/gösterme için oluşturuldu
  const [showMenu, setShowMenu] = useState(false);

  // responsive yan menüyü açan hamburger butonu için açma kapama fonksiyonu oluşturuldu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // boşluğa bastığımızda responsive yan menünün kapanması için oluşturuldu
  const hideMenu = () => {
    setShowMenu(false);
  };
  const logo = (
    <div className={styles.logo}>
      <Link to="/">
        <h2>
          e<span>Shop</span>.
        </h2>
      </Link>
    </div>
  );

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  return (
    <header>
      <div className={styles.header}>
        {logo}
        {/* responsive olunca sola gizlenen nav "show-nav" ile sağa kaydırılıyor, hide-nav ile tekrar sola alınıyor*/}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          {/* responsivede sola yerleşen navın üzerine "nav-wrapper" ile aynı boyutta bir siyah ekran ekleniyor. Bu siyah ekran, nav sağa kayınca "show-nav-wrapper" ile %100 daha fazla sağa kayarak ekranın sağ kısmını dolduruyor. */}
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <Link to="/login">Login</Link>
              <Link to="/order-history">My Orders</Link>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
