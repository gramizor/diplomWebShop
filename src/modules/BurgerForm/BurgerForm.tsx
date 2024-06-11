import { Burger, Button, Menu, Modal, PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./styles.module.css";
import { useState } from "react";
import { RoutesEnum } from "../../app/routes/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";
import api from "../../app/api";

const BurgerForm = () => {
  const [isOpenPunkts, setIsOpenPunkts] = useState(false);
  const [menuOpened, { toggle: toggleMenu }] = useDisclosure();
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure();
  const [role] = useState<string | null>(localStorage.getItem("userRole"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const togglePunkts = () => {
    setIsOpenPunkts(!isOpenPunkts);
  };

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const isPassFormDisabled = !pass1 || !pass2 || pass1 !== pass2;

  const handlePass = () => {
    setIsBtnLoading(true);
    api
      .post(`/update`, { password: pass1 })
      .then((response) => {
        console.log("Password recovered:", response.data);
      })
      .catch((err) => {
        console.error("Error recovering password:", err);
      })
      .finally(() => {
        setIsBtnLoading(false);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(RoutesEnum.Auth);
  };

  return (
    <>
      <Menu
        shadow="md"
        position="bottom-end"
        width={250}
        offset={10}
        classNames={{ dropdown: styles.dropdown }}
        opened={menuOpened}
        transitionProps={{ transition: "rotate-right", duration: 150 }}
      >
        <Menu.Target>
          <Burger
            opened={menuOpened}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            color="var(--clr-on-surface)"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label></Menu.Label>
          <Menu.Item onClick={togglePunkts}>Данные аккаунта</Menu.Item>
          {isOpenPunkts && (
            <>
              <Menu.Item
                className={styles.subItem}
                component="a"
                href={RoutesEnum.AccountSetting}
              >
                {role === "INDIVIDUAL_CUSTOMER" || role === "LEGAL_CUSTOMER"
                  ? "Карточка покупателя"
                  : "Карточка продавца"}
              </Menu.Item>
              <Menu.Item disabled className={styles.subItem}>
                Платежная информация
              </Menu.Item>
              <Menu.Item disabled className={styles.subItem}>
                Адреса
              </Menu.Item>
              <Menu.Item
                className={styles.subItem}
                component="a"
                href={RoutesEnum.FavoriteSellers}
              >
                Избранные продавцы
              </Menu.Item>
              <Menu.Item
                className={styles.subItem}
                component="a"
                href={RoutesEnum.BlackListSellers}
              >
                Черный список продавцов
              </Menu.Item>
            </>
          )}
          <Menu.Item disabled>Корзины</Menu.Item>
          <Menu.Item disabled>Запросы</Menu.Item>
          <Menu.Item disabled>Заказы</Menu.Item>
          <Menu.Item color="#0055BB" onClick={openModal}>
            Поменять пароль
          </Menu.Item>
          <Menu.Item color="red" onClick={handleLogout}>
            Выйти
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title="Смена пароля"
        centered
      >
        <PasswordInput
          label="Пароль"
          placeholder="Введите новый пароль"
          value={pass1}
          onChange={(event) => setPass1(event.currentTarget.value)}
          required
          mt="md"
        />
        <PasswordInput
          label="Подтверждение пароля"
          placeholder="Повторите новый пароль"
          value={pass2}
          onChange={(event) => setPass2(event.currentTarget.value)}
          required
          mt="md"
        />
        <Button
          fullWidth
          mt="xl"
          onClick={handlePass}
          loading={isBtnLoading}
          disabled={isPassFormDisabled}
          color="blue"
        >
          Задать новый пароль
        </Button>
      </Modal>
    </>
  );
};

export default BurgerForm;
