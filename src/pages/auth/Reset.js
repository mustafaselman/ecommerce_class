////şifre resetleme sayfası
import React, { useState } from 'react'
import styles from "./auth.module.scss"
import resetImg from "../../assets/forgot.png"
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom'

const Reset = () => {

  const [ email, setEmail ] = useState("")

  const resetPassword = (e) => {
    e.preventDefault()
    alert(email)
}

  return (
    <section className={`container ${styles.auth}`}>
    <div className={styles.img}>
      <img src={resetImg} alt="Login" width="400" />
    </div>
    <Card cardClass={styles.form}>
      <h2>Reset</h2>
      <form onSubmit={resetPassword}>
        <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        {/* bu classlar index.css klasöründe olduğu için otomatik olarak etkilediği tüm childler kullanır. */}
        <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
        <div className={styles.links}>
          <p>
            <Link to="/login">- Login</Link>
          </p>
          <p>
            <Link to="/login">- Register</Link>
          </p>
        </div>
      </form>
    </Card>
  </section>
  )
}

export default Reset