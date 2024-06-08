import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../app/config";
import { RoutesEnum } from "../../app/routes";
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import styles from "./styles.module.css";

export const RecoverPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [email, setEmail] = useState("");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const isPassFormDisabled = !pass1 || !pass2 || pass1 !== pass2;
  const isEmailFormDisabled = !email;

  const handlePassFormSubmit = () => {
    if (token) {
      setIsBtnLoading(true);
      axios
        .post(`${BASE_URL}/recover/${token}`, { password: pass1 })
        .then((response) => {
          console.log("Password recovered:", response.data);
          navigate(RoutesEnum.Auth);
        })
        .catch((err) => {
          console.error("Error recovering password:", err);
        })
        .finally(() => {
          setIsBtnLoading(false);
        });
    }
  };

  const handleEmailFormSubmit = () => {
    setIsBtnLoading(true);
    axios
      .post(`${BASE_URL}/recover`, { email: email })
      .then((response) => {
        console.log("Password recovery email sent:", response.data);
        navigate(RoutesEnum.Auth);
      })
      .catch((err) => {
        console.error("Error sending recovery email:", err);
      })
      .finally(() => {
        setIsBtnLoading(false);
      });
  };

  return (
    <div>
      {token == ":token" ? (
        <Container size={600} my={40}>
          <Title ta="center" className={styles.title}>
            Форма восстановления пароля
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {"Вспомнили пароль? "}
            <Anchor to={RoutesEnum.Auth} size="sm" component={Link}>
              Вернуться к авторизации
            </Anchor>
          </Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="Введите вашу почту"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              required
              mt="md"
            />
            <Button
              fullWidth
              mt="xl"
              onClick={handleEmailFormSubmit}
              loading={isBtnLoading}
              disabled={isEmailFormDisabled}
              color="blue"
            >
              Восстановить пароль
            </Button>
          </Paper>
        </Container>
      ) : (
        <Container size={600} my={40}>
          <Title ta="center" className={styles.title}>
            Форма восстановления пароля
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            {"Вспомнили пароль? "}
            <Anchor to={RoutesEnum.Auth} size="sm" component={Link}>
              Вернуться к авторизации
            </Anchor>
          </Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
              onClick={handlePassFormSubmit}
              loading={isBtnLoading}
              disabled={isPassFormDisabled}
              color="blue"
            >
              Назначить новый пароль
            </Button>
          </Paper>
        </Container>
      )}
    </div>
  );
};
