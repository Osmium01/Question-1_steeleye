import React from "react";
import styles from "./ListRow.module.css";

const ListRow = ({ children, onSelectOrder }) => {
  return (

    <tr className={styles.cell} onClick={() => onSelectOrder(children)}>
      {children}
    </tr>
  );
};

export default ListRow;