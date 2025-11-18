import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import logo from "../assets/imgs/logo2.png";

const Navbar = () => {
  let menus = [
    { name: "홈", path: "/" },
    { name: "날씨", path: "/weather" },
    { name: "상품소개", path: "/products" },
    { name: "장바구니", path: "/cart" },
    { name: "회사소개", path: "/about" },
  ];
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}><img src={logo} alt="logo" /></div>
      <nav>
        <ul className={styles.menuList}>
          {menus.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                {item.name}{" "}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
