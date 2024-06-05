import { useState } from "react";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import SearchForm from "../../modules/SearchForm/SearchForm";
import styles from "./styles.module.css";
import { Checkbox, Rating, Select, Text } from "@mantine/core";

interface Seller {
  name: string;
  rating: number;
  physics: boolean;
}

const SearchSellers = () => {
  const [data, setData] = useState<Seller[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhysic, setIsPhysic] = useState(true);
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [city, setCity] = useState<string>("");

  const columns = [
    {
      header: "Производитель",
      accessor: (seller: Seller) => seller.name,
    },
    {
      header: "Рейтинг",
      accessor: (seller: Seller) => seller.rating,
    },
    {
      header: "Работает с ФЛ",
      accessor: (seller: Seller) => seller.physics,
    },
  ];

  return (
    <div>
      <SearchForm placeholder="Поиск продавца" />
      <div className={styles.paramText} onClick={() => setIsOpen(!isOpen)}>
        <Text>Дополнительные параметры поиска</Text>
      </div>
      {isOpen && (
        <div className={styles.params}>
          <div className={styles.rating}>
            <div>Не ниже, чем:</div>
            <Rating defaultValue={3} />
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={isPhysic}
              defaultChecked
              label="Работает с физлицами"
              onChange={(event) => setIsPhysic(event.currentTarget.checked)}
            />
            <Checkbox
              checked={isManufacturer}
              defaultChecked
              label="Является производителем"
              onChange={(event) =>
                setIsManufacturer(event.currentTarget.checked)
              }
            />
          </div>
          <Select
            searchable
            placeholder="Город производителя"
            data={["Москва", "Санкт-Петербург", "Самара", "Челябинск"]}
            searchValue={city}
            onSearchChange={(value) => setCity(value)}
            clearable
            className={styles.select}
          />
        </div>
      )}
      {data.length > 0 ? (
        <ReusableTable columns={columns} data={data} />
      ) : (
        <h1 style={{ textAlign: "center" }}>
          К сожалению, продавцы не найдены
        </h1>
      )}
    </div>
  );
};

export default SearchSellers;
