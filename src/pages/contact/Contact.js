//// contact us kısmı burada yazılır
import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import Card from '../../components/card/Card'
import styles from "./Contact.module.scss"
import {GoLocation} from "react-icons/go"

const Contact = () => {

  const sendEmail = () => {}

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type="text" name="user_name" placeholder="Full Name" required />
              <label>Email:</label>
              <input type="email" name="user_email" placeholder="Your active email" required />
              <label>Subject:</label>
              <input type="text" name="subject" placeholder="Subject" required />
              <label>Your Message:</label>
              <textarea name="message" cols="30" rows="10" required />
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+90 551 631 37 32</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Izmir, Turkey</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@mustafaselman</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default Contact