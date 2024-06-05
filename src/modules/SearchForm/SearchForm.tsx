import styles from "./styles.module.css";
import { useForm } from "@mantine/form";
import { Button, Input, MultiSelect } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { FormEvent, useState } from "react";

interface SearchFormProps {
  onSearch?: (searchQuery: string, analogTypes: string[]) => void;
  isSelector?: boolean;
  placeholder: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  placeholder,
  onSearch,
  isSelector,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const form = useForm({
    initialValues: { search: "" },
    validate: {
      search: (value) => value.trim().length > 2,
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(form.values.search, selectedTypes);
    }
    // form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <Input
          placeholder={placeholder}
          {...form.getInputProps("search")}
          leftSection={<IconSearch stroke={2} size={16} />}
          className={styles.input}
        />
        {isSelector && (
          <MultiSelect
            label="Выберите тип аналога"
            placeholder="Любой аналог"
            searchable
            searchValue={searchValue}
            nothingFoundMessage="Nothing found..."
            checkIconPosition="right"
            onSearchChange={setSearchValue}
            value={selectedTypes}
            onChange={setSelectedTypes}
            data={["Полный", "Ближайший", "Функциональный", "Возможный"]}
            classNames={{ wrapper: styles.wrapper }}
            clearable
          />
        )}
        <Button type="submit" color="#0055BB">
          Искать
        </Button>
      </form>
    </>
  );
};

export default SearchForm;
