import { useState } from "react";
import { Checkbox, Rating, Select, Text } from "@mantine/core";
import SearchForm from "../../modules/SearchForm/SearchForm";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import styles from "./styles.module.css";
import api from "../../app/api";

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
  const [isPhysic, setIsPhysic] = useState<boolean | null>(null);
  const [isManufacturer, setIsManufacturer] = useState<boolean | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);

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

  const filterRequestData = (
    data: Record<string, unknown>
  ): Record<string, unknown> => {
    const filteredData: Record<string, unknown> = {};

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== "" && value !== null && value !== undefined) {
        filteredData[key] = value;
      }
    });

    return filteredData;
  };

  const handleSearch = async (searchQuery: string, analogTypes: string[]) => {
    const requestData = {
      detailName: searchQuery,
      analogTypes: analogTypes.join(","),
      indFlag: isPhysic,
      rating: rating,
      flagManufacturer: isManufacturer,
      city: city,
      favoriteFlag:
        favorite === "Избранное"
          ? true
          : favorite === "Черный список"
          ? false
          : null,
      blacklistFlag:
        favorite === "Черный список"
          ? true
          : favorite === "Избранное"
          ? false
          : null,
    };

    const filteredData = filterRequestData(requestData);

    try {
      const response = await api.get<Detail[]>("/api", {
        params: filteredData,
      });

      const dataWithId = response.data.map((item, index) => ({
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
          handleSearch(query, analogTypes)
        }
      />

      <div className={styles.paramText} onClick={() => setIsOpen(!isOpen)}>
        <Text>Дополнительные параметры поиска</Text>
      </div>
      {isOpen && (
        <div className={styles.params}>
          <div className={styles.rating}>
            <div>Не ниже, чем:</div>
            <Rating
              value={rating || 0}
              onChange={(value) => setRating(value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={isPhysic ?? false}
              label="Работает с физлицами"
              onChange={(event) =>
                setIsPhysic(event.currentTarget.checked ? true : null)
              }
            />
            <Checkbox
              checked={isManufacturer ?? false}
              label="Является производителем"
              onChange={(event) =>
                setIsManufacturer(event.currentTarget.checked ? true : null)
              }
            />
          </div>
          <Select
            searchable
            placeholder="Город производителя"
            data={["Москва", "Санкт-Петербург", "Самара", "Челябинск"]}
            value={city ?? ""}
            onChange={(value) => setCity(value || null)}
            clearable
            className={styles.select}
          />
          <Select
            placeholder="Выберите коллекцию"
            data={["Черный список", "Избранное"]}
            value={favorite ?? ""}
            onChange={(value) => setFavorite(value || null)}
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
