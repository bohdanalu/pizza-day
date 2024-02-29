import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./ModalWindow.module.css";

const ModalWindow = ({ onClose, children }) => {
  return (
    <>
      <div className={styles.modal__background}></div>;
      <div className={styles.modal}>
        <span className={styles.modal__close} onClick={onClose}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </>
  );
};

export default ModalWindow;
