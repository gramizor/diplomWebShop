import styles from "./styles.module.css";
import { Navbar } from "../../components";
import { useForm } from "@mantine/form";
import { Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const MainPage = () => {
  const form = useForm({
    initialValues: { search: "" },
    validate: {
      search: (value) => value.trim().length > 2,
    },
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(form.values.search);
    form.reset();
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <Input
          placeholder="Поиск детали"
          {...form.getInputProps("search")}
          leftSection={<IconSearch stroke={2} size={16} />}
          className={styles.input}
        />
        <Button onClick={handleSubmit} color="#0055BB">
          Искать
        </Button>
      </form>
    </div>
  );
};

export { MainPage };
