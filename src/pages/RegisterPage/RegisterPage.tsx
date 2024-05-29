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
import InputMask from "react-input-mask"; // Импортируем библиотеку
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
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [formData, setFormData] = useState<IUserRegisterFromData>({
    email: "",
    password: "",
    password2: "",
    name: "",
    surname: "",
    phone: "",
    patronymic: "",
    role: "", // Обновлено значение по умолчанию на пустую строку
  });

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.password2 ||
    formData.password !== formData.password2;

  const isNextButtonDisabled =
    !formData.name || !formData.surname || !formData.role || !formData.phone;

  // const handleRegisterClick = async () => {
  //   if (isButtonDisabled) return;
  //   setIsBtnLoading(true);
  //   try {
  //     await registerUser({
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     navigate(RoutesEnum.Home);
  //   } finally {
  //     setIsBtnLoading(false);
  //   }
  // };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!(name in formData)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: string | null) => {
    setFormData({ ...formData, role: value ?? "" });
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
              <InputMask
                mask="+7 (999) 999-99-99"
                value={formData.phone}
                onChange={handleDataChange}
              >
                {(inputProps?: JSX.Element) => (
                  <TextInput
                    {...inputProps}
                    label="Номер телефона"
                    name="phone"
                    placeholder="+7 (999) 999-99-99"
                    required
                  />
                )}
              </InputMask>
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
              onClick={() => navigate("/")}
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
