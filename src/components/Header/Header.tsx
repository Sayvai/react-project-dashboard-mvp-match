import styles from "./Header.module.css";

import logo from "../../assets/mvp-logo.svg";
import hamburger from "../../assets/mvp-hamburger.svg";
import { ENDPOINTS, UserResponse } from "../../endpoints";
import { useEffect, useState } from "react";
import { getUserInitials } from "../../helpers";

const Header = () => {
  const [user, setUser] = useState<UserResponse["data"][0]>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const response = await fetch(ENDPOINTS.USERS);
    const data = await response.json();
    const userData = data?.data[0];

    if (!userData) {
      return;
    }

    setUser(userData);
  };

  return (
    <header className={styles.container}>
      <a href="#">
        <img src={logo} alt="MVP logo" />
      </a>
      <a href="#">
        <img src={hamburger} alt="Hamburger menu" />
      </a>
      {user ? (
        <div className={styles.user_container}>
          <div className={styles.user_intiials}>
            {getUserInitials(user.firstName, user.lastName)}
          </div>
          <div className={styles.user_name}>
            <a href="#">{`${user.firstName} ${user.lastName}`}</a>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
