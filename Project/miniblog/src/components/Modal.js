import styles from "./Modal.module.css";

const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideclick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className={styles.modal} onClick={handleOutsideclick}>
      <div className={styles.container}>
        <button className={styles.close} onClick={onClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
