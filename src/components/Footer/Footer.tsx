import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ul className={styles.links}>
        <li>
          <a href="#">Terms &amp; Conditions</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
