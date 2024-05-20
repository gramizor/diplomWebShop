import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";
import { RoutesEnum } from "../../app/routes";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import mephi from "../../assets/icons/logo-without.png";
import clsx from "clsx";

const Navbar = () => {
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();

  const toggleMenu = () => {
    toggle();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <img src={mephi} alt="Logo mephi" className={styles.image} />
        <p className={styles.title}>РадиоКомпонент</p>
        <Link to={RoutesEnum.Home}>
          <p
            className={clsx(styles["navbar-link"], {
              [styles.active]: pathname === RoutesEnum.Home,
            })}
          >
            Главная
          </p>
        </Link>
      </div>
      <div className={styles.menu}>
        <Burger
          opened={opened}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          color="var(--clr-on-surface)"
        />
        <div className={clsx(styles.menuItems, { [styles.show]: opened })}>
          <Button onClick={logoutUser} color="#0055BB">
            Выйти
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
