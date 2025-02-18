import Modal from "react-modal";
import styles from "./TrailerModal.module.css";
import { FaTimes } from "react-icons/fa";

const TrailerModal = ({ isOpen, onClose, trailerKey }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
    >
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
      {trailerKey ? (
        <iframe
          className={styles.trailerVideo}
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Трейлер"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>
          Трейлер недоступний.
        </p>
      )}
    </Modal>
  );
};

export default TrailerModal;
