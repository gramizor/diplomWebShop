import React, { useState } from "react";
import axios from "axios";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import SearchForm from "../../modules/SearchForm/SearchForm";
import styles from "./styles.module.css";
import BASE_URL from "../../app/config";
import { RoutesEnum } from "../../app/routes";

interface Detail {
  id: string;
  name: string;
  manufacturer: string;
  analogType: string;
  url: string;
}

const analogTypeMap = {
  FUNCTIONAL_ANALOG: "Функциональный",
  POSSIBLE_ANALOG: "Возможный",
  NEARLY_ANALOG: "Ближайший",
  PIN_TO_PIN: "Полный",
};

const humanReadableToBackend = (humanReadable: string) => {
  return (
    Object.keys(analogTypeMap).find(
      (key) =>
        analogTypeMap[key as keyof typeof analogTypeMap] === humanReadable
    ) || humanReadable
  );
};

const backendToHumanReadable = (backendValue: string) => {
  return (
    analogTypeMap[backendValue as keyof typeof analogTypeMap] || backendValue
  );
};

const AnalogPage: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [data, setData] = useState<Detail[]>([]);

  const columns = [
    {
      header: "Наименование",
      accessor: (detail: Detail) => detail.name,
    },
    {
      header: "Производитель",
      accessor: (detail: Detail) => detail.manufacturer,
    },
    {
      header: "Тип аналога",
      accessor: (detail: Detail) => {
        const readableType = backendToHumanReadable(detail.analogType);
        return readableType;
      },
    },
  ];

  const handleSearch = async (searchQuery: string, analogTypes: string[]) => {
    setSearch(searchQuery);

    try {
      const response = await axios.post(`${BASE_URL}/detail/analog`, {
        name: searchQuery,
        analogTypes: analogTypes.map(humanReadableToBackend),
      });

      const dataWithId = response.data.map((item: Detail, index: number) => ({
        ...item,
        id: index.toString(), // добавляем уникальный id
      }));

      console.log("Полученные данные:", dataWithId);
      setData(dataWithId);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <>
      <SearchForm
        placeholder="Поиск детали"
        isSelector
        onSearch={handleSearch}
      />
      {search && (
        <div className={styles.searchDone}>
          {data.length > 0 ? (
            <>
              <h1 style={{ textAlign: "center" }}>
                Найденные аналоги для "{search}":
              </h1>
              <ReusableTable<Detail>
                data={data}
                columns={columns}
                url={() => `${RoutesEnum.Home}`}
                btnProps="Искать деталь"
              />
            </>
          ) : (
            <h1 style={{ textAlign: "center" }}>
              К сожалению, аналоги для "{search}" не найдены
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default AnalogPage;
