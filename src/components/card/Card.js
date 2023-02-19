//// oluşturulan tüm cardlar için kullanılan en dış div ve className belirleme olayını tekrarlamamak adına yazılan bir component
import React from "react";
import styles from "./Card.module.scss";

// Card içerisine aldığımız componentlere(children) card yapısı oluşturmak ve onların kullandığı custom class ları "cardClass" olarak belirtmek için oluşturuldu. Amaç ortak kodları toplu bir yapıya kavuşturarak 
const Card = ({ children, cardClass }) => {
  return <div className={`${styles.card} ${cardClass}`}>{children}</div>;
};

export default Card;
