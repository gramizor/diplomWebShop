import styles from "./styles.module.css";
import { RoutesEnum } from "../../app/routes";
import { Button, Menu } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import mephi from "../../assets/icons/logo-without.png";
import clsx from "clsx";
import { IconSearch } from "@tabler/icons-react";
import BurgerForm from "../../modules/BurgerForm/BurgerForm";

const Navbar = () => {
  const { pathname } = useLocation();

  const handleHomeClick = (event: React.MouseEvent) => {
    if (pathname === RoutesEnum.Home) {
      event.preventDefault();
    }
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
          offset={10}
          classNames={{ dropdown: styles.dropdown }}
          trigger="click-hover"
          openDelay={100}
          closeDelay={400}
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
            <Link to={RoutesEnum.Catalog}>
              <Menu.Item>Каталог деталей</Menu.Item>
            </Link>
            <Link to={RoutesEnum.Analog}>
              <Menu.Item>Аналоги</Menu.Item>
            </Link>
            <Link to={RoutesEnum.Home} onClick={handleHomeClick}>
              <Menu.Item>Детали среди продавцов</Menu.Item>
            </Link>
            <Link to={RoutesEnum.Sellers}>
              <Menu.Item>Продавцы</Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className={styles.rightSection}>
        <BurgerForm />
      </div>
    </nav>
  );
};

export default Navbar;
