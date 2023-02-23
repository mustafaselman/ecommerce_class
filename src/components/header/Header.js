//// tüm linklerin olduğu başlık kısmı
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";

const Header = () => {
  // responsive de yan menüyü(nav) gizleme/gösterme için oluşturuldu
  const [showMenu, setShowMenu] = useState(false);

  //giriş yapan kullanıcı ismini kaydeder
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // giriş yapan kullanıcıyı sürekli gösterecektir.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          // burada kullanıcını adı yoksa emailden almak için email deki son @ işaretine kadar kesilip kaydedilir
          const u1 = user.email.slice(0, user.email.lastIndexOf("@"));
          // ardından kesilen kısmının ilk harfi büyük diğerleri küçük olucak şekilde işlenir.
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          // sonra displayName olarak kaydedilir
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        // giriş yapan kullanıcıyı redux a gönderiyor
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  // responsive yan menüyü açan hamburger butonu için açma kapama fonksiyonu oluşturuldu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // boşluğa bastığımızda responsive yan menünün kapanması için oluşturuldu
  const hideMenu = () => {
    setShowMenu(false);
  };

  // kullanıcı çıkış işlemi için kullanılır.
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
  // nav içindeki linkler tıklandığında isactive true olur. Bizde bu durumu kullanarak bir class ekledikki seçilen link belli olsun
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

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

          {/* responsive yapıda gösterilen sol navın en üstündeki logo ve yanındaki kapatma(çarpı) işareti oluşturuluyor. logo-mobile classı sadece responsive de görünsün diye oluşturuldu. */}
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <AdminOnlyLink>
              <li>
                <button className='--btn --btn-primary'>Admin</button>
              </li>
            </AdminOnlyLink>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLogin>
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
