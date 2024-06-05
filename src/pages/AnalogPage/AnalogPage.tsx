import React, { useState } from "react";
import axios from "axios";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import SearchForm from "../../modules/SearchForm/SearchForm";
import styles from "./styles.module.css";
import BASE_URL from "../../app/config";

interface Detail {
  name: string;
  manufacturer: string;
  typeDetail: string;
}

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
      accessor: (detail: Detail) => detail.typeDetail,
    },
  ];

  const handleSearch = async (searchQuery: string, analogTypes: string[]) => {
    console.log("Поисковый запрос:", searchQuery);
    setSearch(searchQuery);

    try {
      const response = await axios.post(`${BASE_URL}/detail/analog`, {
        name: searchQuery,
        analogTypes: analogTypes,
      });

      setData(response.data);
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
              <ReusableTable<Detail> data={data} columns={columns} />
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
