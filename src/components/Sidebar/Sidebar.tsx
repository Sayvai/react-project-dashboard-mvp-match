import styles from "./Sidebar.module.css";

import icon_barchart from "../../assets/mvp-sidebar-barchart.svg";
import icon_grid from "../../assets/mvp-sidebar-grid.svg";
import icon_computer from "../../assets/mvp-sidebar-computer.svg";
import icon_piechart from "../../assets/mvp-sidebar-piechart.svg";
import icon_logout from "../../assets/mvp-sidebar-logout.svg";

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      <a href="#">
        <img src={icon_barchart} alt="Bar chart icon" />
      </a>
      <a href="#">
        <img src={icon_grid} alt="Grid icon" />
      </a>
      <a href="#">
        <img src={icon_computer} alt="Computer icon" />
      </a>
      <a href="#">
        <img src={icon_piechart} alt="Pie chart icon" />
      </a>
      <a href="#">
        <img src={icon_logout} alt="Logout icon" />
      </a>
    </aside>
  );
};

export default Sidebar;
