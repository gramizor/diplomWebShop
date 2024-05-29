import { Burger, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./styles.module.css";
import { RoutesEnum } from "../../app/routes";
import { Link } from "react-router-dom";

const BurgerForm = () => {
  const [opened, { toggle }] = useDisclosure();

  const toggleMenu = () => {
    toggle();
  };

  return (
    <>
      <Menu
        shadow="md"
        position="bottom-end"
        width={250}
        offset={10}
        classNames={{ dropdown: styles.dropdown }}
        opened={opened}
        onClose={() => toggleMenu()}
        transitionProps={{ transition: "rotate-right", duration: 150 }}
      >
        <Menu.Target>
          <Burger
            opened={opened}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            color="var(--clr-on-surface)"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label></Menu.Label>
          <Link to={RoutesEnum.Catalog}>
            <Menu.Item>Настройки аккаунта</Menu.Item>
          </Link>
          <Link to={RoutesEnum.Analog}>
            <Menu.Item>Данные покупателя</Menu.Item>
          </Link>
          <Menu.Item component="a" className={styles.subItem}>
            Информация о покупателе
          </Menu.Item>
          <Menu.Item disabled component="a" className={styles.subItem}>
            Платежная информация
          </Menu.Item>
          <Menu.Item disabled component="a" className={styles.subItem}>
            Адреса
          </Menu.Item>
          <Menu.Item component="a" href="https://mantine.dev">
            Корзины
          </Menu.Item>
          <Menu.Item component="a" href="https://mantine.dev">
            Запросы
          </Menu.Item>
          <Menu.Item disabled component="a" href="https://mantine.dev">
            Заказы
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default BurgerForm;
