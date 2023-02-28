import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

export const Modal = ({ onClose, children }) => {
    
    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose])
    
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    }

    return createPortal(
        <div className={styles.backdrop} onClick={handleClick}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>, modalRoot
    )
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}