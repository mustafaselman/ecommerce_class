//// bazı işlemlerde beklemek gerektiğinde loader.gif çalıştırılır
import React from "react";
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return (
    // tam ekranı kaplama için "wrapper", loader gif i ortalamak için "loader" classı kullandık.
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
