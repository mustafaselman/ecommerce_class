//// kayıtlı kullanıcılar için giriş sayfası
import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
const Login = () => {

  // formdaki inputlara ait state ler
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const loginUser = (e) => {
    e.preventDefault()
    console.log(email,password)
  }
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <Card cardClass={styles.form}>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
          <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          {/* bu classlar index.css klasöründe olduğu için otomatik olarak etkilediği tüm childler kullanır. */}
          <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
          <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div>
          <p>-- or --</p>
        </form>
        <button className="--btn --btn-danger --btn-block">
          <FaGoogle color="#fff" />
          Login With Google
        </button>
        <span className={styles.register}>
          <p>Don't have an account</p>
          <Link to="/register">Register</Link>
        </span>
      </Card>
    </section>
  );
};

export default Login;
