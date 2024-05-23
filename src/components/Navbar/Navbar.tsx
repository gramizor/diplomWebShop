import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";
import { RoutesEnum } from "../../app/routes";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button, Menu } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import mephi from "../../assets/icons/logo-without.png";
import clsx from "clsx";
import { IconSearch } from "@tabler/icons-react";

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
        <Link to={RoutesEnum.Home}>
          <p
            className={clsx(styles["navbar-link"], {
              [styles.active]: pathname === RoutesEnum.Home,
            })}
          >
            РадиоКомпонент
          </p>
        </Link>
        <Menu
          shadow="md"
          position="bottom-end"
          width={250}
          offset={20}
          classNames={{ dropdown: styles.dropdown }}
        >
          <Menu.Target>
            <Button
              color="#0055BB"
              leftSection={<IconSearch stroke={3} size={16} color="#fff" />}
            >
              Поиск
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Варианты поиска</Menu.Label>
            <Menu.Item component="a" href="https://mantine.dev">
              Каталог деталей
            </Menu.Item>
            <Menu.Item component="a" href="https://mantine.dev">
              Поиск аналагов
            </Menu.Item>
            <Menu.Item component="a" href="https://mantine.dev">
              Поиск среди продавцов
            </Menu.Item>
            <Menu.Item component="a" href="https://mantine.dev">
              Поиск продавцов
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className={styles.rightSection}>
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
