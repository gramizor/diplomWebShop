import { Burger, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./styles.module.css";
import { useState } from "react";

const BurgerForm = () => {
  const [opened, { toggle }] = useDisclosure();
  const [isOpenPunkts, setIsOpenPunkts] = useState(false);

  const toggleMenu = () => {
    toggle();
  };

  const handleOpen = () => {
    setIsOpenPunkts(!isOpenPunkts);
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
          <Menu.Item onClick={handleOpen}>Данные покупателя</Menu.Item>
          {isOpenPunkts && (
            <>
              <Menu.Item className={styles.subItem}>
                Информация о покупателе
              </Menu.Item>
              <Menu.Item disabled className={styles.subItem}>
                Платежная информация
              </Menu.Item>
              <Menu.Item disabled className={styles.subItem}>
                Адреса
              </Menu.Item>
              <Menu.Item className={styles.subItem}>
                Избранные продавцы
              </Menu.Item>
              <Menu.Item className={styles.subItem}>
                Черный список продавцов
              </Menu.Item>
            </>
          )}
          <Menu.Item disabled component="a" href="https://mantine.dev">
            Корзины
          </Menu.Item>
          <Menu.Item disabled component="a" href="https://mantine.dev">
            Запросы
          </Menu.Item>
          <Menu.Item disabled component="a" href="https://mantine.dev">
            Заказы
          </Menu.Item>
          <Menu.Item color="#0055BB" onClick={() => alert("Поменять пароль")}>
            Поменять пароль
          </Menu.Item>
          <Menu.Item color="red" onClick={() => alert("Выйти")}>
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default BurgerForm;
