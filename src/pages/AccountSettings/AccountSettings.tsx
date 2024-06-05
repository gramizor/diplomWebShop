import { Button, Input, Modal, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const AccountSettings = () => {
  const [openedPass, { close: closePass }] = useDisclosure(false);

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
        </Group>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Text>Логин:</Text>
        <Group>
          <Text>gramizor</Text>
        </Group>
      </div>
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
    </div>
  );
};

export default AccountSettings;
