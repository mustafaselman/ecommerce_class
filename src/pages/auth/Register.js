//// kayıtlı olmayan kulllanıcılar için kayıt sayfası
import React, { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Register = () => {

  // formdaki inputlara ait state ler
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [cPassword,setCPassword] = useState("")

  // formdaki input değerlerini almak için kullanılacak.
  const registerUser = (e) => {
    e.preventDefault()
    console.log(email,password,cPassword)
  }
  return (
    <section className={`container ${styles.auth}`}>
      <Card cardClass={styles.form}>
        <h2>Register</h2>
        <form onSubmit={registerUser}>
          <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="ConfirmPassword" required value={cPassword} onChange={(e) => setCPassword(e.target.value)}/>
          {/* bu classlar index.css klasöründe olduğu için otomatik olarak etkilediği tüm childler kullanır. */}
          <button tyepe="submit" className="--btn --btn-primary --btn-block">Register</button>
        </form>
        <span className={styles.register}>
          <p>Already an account?</p>
          <Link to="/login">Login</Link>
        </span>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width="400" />
      </div>
    </section>
  );
};

export default Register;
