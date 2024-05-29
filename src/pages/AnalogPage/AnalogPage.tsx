import React, { useState } from "react";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import SearchForm from "../../modules/SearchForm/SearchForm";
import styles from "./styles.module.css";

interface Detail {
  name: string;
  manufacturer: string;
  typeDetail: string;
}

const data: Detail[] = [
  { name: "VB01-134", manufacturer: "Радиотехники", typeDetail: "Микросхема" },
  { name: "XP02-221", manufacturer: "Электроника", typeDetail: "Резистор" },
  { name: "TR03-442", manufacturer: "Технологии", typeDetail: "Транзистор" },
  {
    name: "CD04-567",
    manufacturer: "Комплектующие",
    typeDetail: "Конденсатор",
  },
  { name: "IN05-890", manufacturer: "ПромЭлектро", typeDetail: "Индуктор" },
  {
    name: "SW06-213",
    manufacturer: "Мехатроника",
    typeDetail: "Переключатель",
  },
];

const AnalogPage: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);
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

  const handleSearch = (searchQuery: string) => {
    console.log("Поисковый запрос:", searchQuery);
    setSearch(searchQuery);
  };

  return (
    <>
      <SearchForm isSelector onSearch={handleSearch} />
      {search && (
        <div className={styles.searchDone}>
          <h1 style={{ textAlign: "center" }}>
            Найденные аналоги для &#123;{search}&#125;:
          </h1>
          <ReusableTable<Detail> data={data} columns={columns} />
        </div>
      )}
    </>
  );
};

export default AnalogPage;
