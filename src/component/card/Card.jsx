import React from "react";
import styles from "./Card.module.css";

const Card = ({ cardData, title }) => {
  // if (!cardData || Object.keys(cardData).length === 0) return null;
  console.log('cardData', cardData)
  return (
    <div className={styles.card}>

    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {Object.entries(cardData).map(([key, value]) => (
        <div className={styles.row} key={key}>
          <div className={styles.label}>{key}</div>
          <div className={styles.value}>{value}</div>
        </div>
      ))}
    </div>
    
    </div>
  );
};

export default Card;