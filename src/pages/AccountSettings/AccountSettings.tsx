import { Button, Input, Modal, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const AccountSettings = () => {
  const [openedPass, { open: openPass, close: closePass }] =
    useDisclosure(false);
  const [openedLogin, { open: openLogin, close: closeLogin }] =
    useDisclosure(false);
  const [openedInfo, { open: openInfo, close: closeInfo }] =
    useDisclosure(false);

  return (
    <div
      style={{
        border: "2px solid #0055BB",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Text>ФИО:</Text>
        <Group>
          <Text>Гранин Михаил</Text>
          <Button
            variant="outline"
            color="#0055BB"
            size="xs"
            onClick={openInfo}
          >
            изменить
          </Button>
        </Group>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Text>Логин:</Text>
        <Group>
          <Text>gramizor</Text>
          <Button
            variant="outline"
            color="#0055BB"
            size="xs"
            onClick={openLogin}
          >
            изменить
          </Button>
        </Group>
      </div>
      <Group justify="apart" style={{ marginTop: "20px" }}>
        <Button onClick={openPass} color="#0055BB">
          Поменять пароль
        </Button>
        <Button variant="outline" color="#0055BB">
          Выйти
        </Button>
      </Group>
      <Modal opened={openedPass} onClose={closePass} title="Смена пароля">
        <Input
          placeholder="Старый пароль"
          style={{ marginBottom: "10px" }}
          type="password"
          color="#0055BB"
        />
        <Input
          placeholder="Новый пароль"
          style={{ marginBottom: "10px" }}
          type="password"
          color="#0055BB"
        />
        <Input
          placeholder="Подтвердите новый пароль"
          style={{ marginBottom: "10px" }}
          type="password"
          color="#0055BB"
        />
        <Button onClick={closePass} color="#0055BB">
          Сохранить
        </Button>
      </Modal>
      <Modal opened={openedLogin} onClose={closeLogin} title="Смена логина">
        <Input
          placeholder="Введите текст..."
          style={{ marginBottom: "10px" }}
        />
        <Button onClick={closeLogin} color="#0055BB">
          Сохранить
        </Button>
      </Modal>
      <Modal opened={openedInfo} onClose={closeInfo} title="Смена ФИО">
        <Input
          placeholder="Введите текст..."
          style={{ marginBottom: "10px" }}
        />
        <Button onClick={closeInfo} color="#0055BB">
          Сохранить
        </Button>
      </Modal>
    </div>
  );
};

export default AccountSettings;
