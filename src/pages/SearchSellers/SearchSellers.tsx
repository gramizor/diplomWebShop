import axios from "axios";
import { useEffect, useState } from "react";
import { Checkbox, Rating, Select, Text } from "@mantine/core";
import SearchForm from "../../modules/SearchForm/SearchForm";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import styles from "./styles.module.css";
import BASE_URL from "../../app/config";

interface Seller {
  id: string;
  companyName: string;
  rating: number;
  physics: boolean;
  city: string;
}

const SearchSellers = () => {
  const [data, setData] = useState<Seller[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhysic, setIsPhysic] = useState<null | boolean>(null);
  const [isManufacturer, setIsManufacturer] = useState<null | boolean>(null);
  const [city, setCity] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (searchQuery = "") => {
    const requestData: any = {
      indFlag: isPhysic,
      rating: minRating,
      flagManufacturer: isManufacturer,
      city: city,
      companyName: searchQuery,
      pageable: {},
    };

    Object.keys(requestData).forEach((key) => {
      if (
        requestData[key] === "" ||
        requestData[key] === null ||
        requestData[key] === undefined ||
        (Array.isArray(requestData[key]) && requestData[key].length === 0)
      ) {
        delete requestData[key];
      }
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/seller/filter`,
        requestData
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      header: "Название компании",
      accessor: (seller: Seller) => seller.companyName,
    },
    {
      header: "Рейтинг",
      accessor: (seller: Seller) => (
        <div className={styles.ratingView}>
          <Rating value={seller.rating} fractions={4} readOnly />
          <span className={styles.ratingText}>{seller.rating}</span>
        </div>
      ),
    },
    {
      header: "Работает с ФЛ",
      accessor: (seller: Seller) => (seller.physics ? "Да" : "Нет"),
    },
    {
      header: "Город",
      accessor: (seller: Seller) => seller.city,
    },
  ];

  return (
    <div>
      <SearchForm placeholder="Поиск продавца" onSearch={fetchData} />
      <div className={styles.paramText} onClick={() => setIsOpen(!isOpen)}>
        <Text>Дополнительные параметры поиска</Text>
      </div>
      {isOpen && (
        <div className={styles.params}>
          <div className={styles.rating}>
            <div>Не ниже, чем:</div>
            <Rating
              defaultValue={0}
              onChange={(value) => setMinRating(value)}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={!!isPhysic}
              label="Работает с физлицами"
              onChange={(event) =>
                setIsPhysic(event.currentTarget.checked ? true : null)
              }
            />
            <Checkbox
              checked={!!isManufacturer}
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
            searchValue={city || ""}
            onSearchChange={(value) => setCity(value || null)}
            clearable
            className={styles.select}
          />
        </div>
      )}
      {data.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={data}
          url={(seller) => `/seller/${seller.companyName}`}
          btnProps="Подробнее"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>
          К сожалению, продавцы не найдены
        </h1>
      )}
    </div>
  );
};

export default SearchSellers;
