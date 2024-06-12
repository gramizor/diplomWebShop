import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Checkbox, Rating, Select, Text } from "@mantine/core";
import SearchForm from "../../modules/SearchForm/SearchForm";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import styles from "./styles.module.css";
import BASE_URL from "../../app/config";

interface Seller {
  id: string;
  companyName: string;
  rating: number;
  indFlag: boolean;
  city: string;
}

interface RequestData {
  indFlag: boolean | null;
  rating: number | null;
  flagManufacturer: boolean | null;
  city: string | null;
  companyName: string;
  pageable: object;
}

const SearchSellers = () => {
  const [data, setData] = useState<Seller[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhysic, setIsPhysic] = useState<boolean | null>(null);
  const [isManufacturer, setIsManufacturer] = useState<boolean | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);

  const filterRequestData = (data: RequestData): Partial<RequestData> => {
    const filteredData: Partial<RequestData> = {};

    Object.keys(data).forEach((key) => {
      const k = key as keyof RequestData;
      const value = data[k];
      if (value !== "" && value !== null && value !== undefined) {
        filteredData[k] = value;
      }
    });

    return filteredData;
  };

  const fetchData = useCallback(
    async (searchQuery = "") => {
      const requestData: RequestData = {
        indFlag: isPhysic,
        rating: minRating,
        flagManufacturer: isManufacturer,
        city: city,
        companyName: searchQuery,
        pageable: {},
      };

      const filteredData = filterRequestData(requestData);

      try {
        const response = await axios.post(
          `${BASE_URL}/seller/filter`,
          filteredData
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [isPhysic, minRating, isManufacturer, city]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      accessor: (seller: Seller) => (seller.indFlag ? "Да" : "Нет"),
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
