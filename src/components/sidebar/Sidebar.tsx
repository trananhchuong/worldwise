import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "../logo/Logo";
import AppNav from "../app-nav/AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
