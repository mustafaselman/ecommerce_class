//// kayıtlı kullanıcılar için giriş sayfası
import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { selectPreviousURL } from "../../redux/slice/cartSlice";
import { useSelector } from "react-redux";
const Login = () => {
  // formdaki inputlara ait state ler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // bekleme animasyonuna ait state
  const [isLoading, setIsLoading] = useState(false);

  const previosURL = useSelector(selectPreviousURL)

  const navigate = useNavigate();

  const redirectUser = () => {
    if(previosURL.includes("cart")) {
       return navigate("/cart")
    }
    navigate("/")
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // veri tabanında kayıtlı kullanıcı girişi yapma
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        toast.success("Login Successful...");
        redirectUser()
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login Succesfully");
        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card cardClass={styles.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* bu classlar index.css klasöründe olduğu için otomatik olarak etkilediği tüm childler kullanır. */}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button
            className="--btn --btn-danger --btn-block"
            onClick={signInWithGoogle}
          >
            <FaGoogle color="#fff" />
            Login With Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account</p>
            <Link to="/register">Register</Link>
          </span>
        </Card>
      </section>
    </>
  );
};

export default Login;
