import styles from "./styles.module.css";
import { useState } from "react";
import { Checkbox, Rating, Select, Text } from "@mantine/core";
import SearchForm from "../../modules/SearchForm/SearchForm";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import axios from "axios";
import BASE_URL from "../../app/config";

interface Detail {
  id: string;
  name: string;
  manufacturer: string;
  typeDetail: string;
  url: string;
}

const MainPage = () => {
  const [data, setData] = useState<Detail[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhysic, setIsPhysic] = useState(true);
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [city, setCity] = useState<string>("");
  const [favorite, setFavorite] = useState<string>("");
  const [rating, setRating] = useState<number>(3);

  const columns = [
    {
      header: "Название",
      accessor: (detail: Detail) => detail.name,
    },
    {
      header: "Производитель",
      accessor: (detail: Detail) => detail.manufacturer,
    },
    {
      header: "Тип аналога",
      accessor: (detail: Detail) => detail.typeDetail,
    },
  ];

  const handleSearch = async (
    searchQuery: string,
    analogTypes: string[],
    rating: number,
    isPhysic: boolean,
    isManufacturer: boolean,
    city: string,
    favorite: string
  ) => {
    try {
      const response = await axios.get(`${BASE_URL}/api`, {
        params: {
          detailName: searchQuery,
          analogTypes: analogTypes.join(","),
          indFlag: isPhysic,
          rating: rating,
          flagManufacturer: isManufacturer,
          city: city,
          favoriteFlag: favorite === "Избранное",
          blacklistFlag: favorite === "Черный список",
        },
      });

      const dataWithId = response.data.map((item: Detail, index: number) => ({
        ...item,
        id: index.toString(),
      }));

      setData(dataWithId);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div className={styles.page}>
      <SearchForm
        placeholder="Поиск детали"
        onSearch={(query: string, analogTypes: string[]) =>
          handleSearch(
            query,
            analogTypes,
            rating,
            isPhysic,
            isManufacturer,
            city,
            favorite
          )
        }
      />

      <div className={styles.paramText} onClick={() => setIsOpen(!isOpen)}>
        <Text>Дополнительные параметры поиска</Text>
      </div>
      {isOpen && (
        <div className={styles.params}>
          <div className={styles.rating}>
            <div>Не ниже, чем:</div>
            <Rating value={rating} onChange={setRating} />
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={isPhysic}
              label="Работает с физлицами"
              onChange={(event) => setIsPhysic(event.currentTarget.checked)}
            />
            <Checkbox
              checked={isManufacturer}
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
          <Select
            placeholder="Выберите коллекцию"
            data={["Черный список", "Избранное"]}
            searchValue={favorite}
            onSearchChange={(value) => setFavorite(value)}
            clearable
            className={styles.select}
          />
        </div>
      )}
      {data.length > 0 ? (
        <ReusableTable columns={columns} data={data} />
      ) : (
        <h1 style={{ textAlign: "center" }}>К сожалению, детали не найдены</h1>
      )}
    </div>
  );
};

export { MainPage };
