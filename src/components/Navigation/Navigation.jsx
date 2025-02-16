// Navigation.js
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>
        Головна
      </Link>
      <Link to="/movies" className={styles.navLink}>
        Фільми
      </Link>
    </nav>
  );
}

export default Navigation;
