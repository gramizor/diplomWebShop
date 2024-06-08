import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import { ChangeEvent, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { IUserLoginData } from "../../app/routes/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [formData, setFormData] = useState<IUserLoginData>({
    email: "",
    password: "",
  });

  const isButtonDisabled = !formData.email || !formData.password;

  const handleLoginClick = async () => {
    if (isButtonDisabled) return;
    setIsBtnLoading(true);
    try {
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        navigate(RoutesEnum.Home);
      }
    } catch (error) {
      console.error("Login error", error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (!(name in formData)) return;
    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <Container size={420} my={40}>
        <Title ta="center" className={styles.title}>
          С возвращением!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {"Ещё нет аккаунта? "}
          <Anchor to={RoutesEnum.Register} size="sm" component={Link}>
            Создайте его бесплатно
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Почта"
            name="email"
            onChange={handleDataChange}
            placeholder="example@mail.ru"
            value={formData.email}
            required
          />
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            name="password"
            value={formData.password}
            onChange={handleDataChange}
            required
            mt="md"
          />
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {"Забыли пароль? "}
            <Anchor to={RoutesEnum.Recover} size="sm" component={Link}>
              Восстановить
            </Anchor>
          </Text>
          <Button
            fullWidth
            mt="xl"
            onClick={handleLoginClick}
            loading={isBtnLoading}
            disabled={isButtonDisabled}
            color={"var(--clr-primary)"}
          >
            Войти
          </Button>
        </Paper>
      </Container>
    </div>
  );
};
