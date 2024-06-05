import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stepper,
  Group,
  Select,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../../slices/authSlice";
import axios from "axios";
import { IUserRegisterData } from "../../app/routes/types";

interface IUserRegisterFromData extends IUserRegisterData {
  password2: string;
}

export const RegisterPage = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [formData, setFormData] = useState<IUserRegisterFromData>({
    email: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
    phone: "",
    patronymic: "",
    role: "",
  });

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.password2 ||
    formData.password !== formData.password2;

  const isNextButtonDisabled =
    !formData.name || !formData.surname || !formData.role || !formData.phone;

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!(name in formData)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = `+7 (${value.substring(0, 3)}) ${value.substring(
      3,
      6
    )}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
    setFormData({ ...formData, phone: formattedValue });
  };

  const handleSelectChange = (value: string | null) => {
    setFormData({ ...formData, role: value ?? "" });
  };

  const handleRegisterClick = async () => {
    if (isButtonDisabled) return;
    setIsBtnLoading(true);
    try {
      const response = await axios.post("/register", {
        roleUser: formData.role,
        surname: formData.surname,
        firstName: formData.name,
        middleName: formData.patronymic,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      });
      const { access, refresh } = response.data;
      dispatch(setTokens({ access, refresh }));
      navigate(RoutesEnum.Home);
    } catch (error) {
      console.error("Registration error", error);
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Container size={600} my={30}>
        <Title ta="center" className={styles.title}>
          Добро пожаловать!
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          {"Уже есть аккаунт? "}
          <Anchor to={RoutesEnum.Auth} size="sm" component={Link}>
            Перейдите ко входу
          </Anchor>
        </Text>
        <Stepper
          active={active}
          onStepClick={setActive}
          p={30}
          mt={30}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Первый шаг" description="Основная информация">
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <TextInput
                label="Фамилия"
                name="surname"
                onChange={handleDataChange}
                placeholder="Иванов"
                value={formData.surname}
                required
              />
              <TextInput
                label="Имя"
                name="name"
                onChange={handleDataChange}
                placeholder="Иван"
                value={formData.name}
                required
              />
              <TextInput
                label="Отчество"
                name="patronymic"
                onChange={handleDataChange}
                placeholder="Иванович"
                value={formData.patronymic}
              />
              <TextInput
                label="Номер телефона"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99"
                required
              />
              <Select
                classNames={{ dropdown: styles.dropdown }}
                label="Ваша роль"
                placeholder="Выберите роль"
                data={[
                  {
                    group: "Покупатель",
                    items: ["Физическое лицо", "Юридическое лицо"],
                  },
                  { group: "Продавец", items: ["Поставщик", "Продавец"] },
                ]}
                value={formData.role}
                onChange={handleSelectChange}
                required
                clearable
              />
            </Paper>
          </Stepper.Step>
          <Stepper.Step label="Второй шаг" description="Защита аккаунта">
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
              <PasswordInput
                label="Подтвердите пароль"
                placeholder="Введите пароль"
                name="password2"
                value={formData.password2}
                onChange={handleDataChange}
                required
                mt="md"
              />
            </Paper>
          </Stepper.Step>
        </Stepper>

        {active === 0 && (
          <Group justify="center">
            <Button onClick={nextStep} disabled={isNextButtonDisabled}>
              Дальше
            </Button>
          </Group>
        )}
        {active === 1 && (
          <Group justify="center">
            <Button variant="default" onClick={prevStep}>
              Назад
            </Button>
            <Button
              onClick={handleRegisterClick}
              loading={isBtnLoading}
              disabled={isButtonDisabled}
            >
              Зарегистрироваться
            </Button>
          </Group>
        )}
      </Container>
    </div>
  );
};
