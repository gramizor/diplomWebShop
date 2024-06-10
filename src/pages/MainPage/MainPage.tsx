import { useState } from "react";
import { Checkbox, Rating, Select, Text, Tooltip } from "@mantine/core";
import SearchForm from "../../modules/SearchForm/SearchForm";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import styles from "./styles.module.css";
import api from "../../app/api";

interface SellerInfo {
  id: number;
  companyName: string;
  zip: string;
  city: string;
  businessAddress: string;
  inn: string;
  kpp: string;
  phoneNumber: string;
  email: string;
  indFlag: boolean;
  flagManufacturer: boolean;
  rating: number;
}

interface Detail {
  id: string;
  name: string;
  manufacturer: string;
  typeDetail: string;
  url: string;
  minQuantity: number;
  quantity: number;
  orderDays: number | null;
  firstPrice: number;
  secondQuantity: number;
  secondPrice: number;
  thirdQuantity: number;
  thirdPrice: number;
  sellerInfo: SellerInfo;
  inStockFlag: boolean;
}

interface SellerData {
  sellerInfo: SellerInfo;
  details: Detail[];
}

const MainPage = () => {
  const [data, setData] = useState<SellerData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPhysic, setIsPhysic] = useState<boolean | null>(null);
  const [isManufacturer, setIsManufacturer] = useState<boolean | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [favorite, setFavorite] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const columns = [
    {
      header: "Наличие",
      accessor: (detail: Detail) => (
        <div>
          {detail.inStockFlag ? (
            <div style={{ color: "green", textAlign: "center" }}>●</div>
          ) : (
            <div style={{ color: "red", textAlign: "center" }}>●</div>
          )}
        </div>
      ),
    },
    {
      header: "Наименование детали",
      accessor: (detail: Detail) => detail.name,
    },
    {
      header: "Мин. для заказа",
      accessor: (detail: Detail) => detail.minQuantity,
    },
    {
      header: "Кол-во в наличии / Время ожидания",
      accessor: (detail: Detail) =>
        detail.quantity === 0
          ? detail.orderDays === null
            ? "-"
            : `${detail.orderDays} дней до появления`
          : detail.quantity,
    },
    {
      header: "Поштучная цена",
      accessor: (detail: Detail) => (
        <Tooltip
          label={
            <>
              <div>
                При заказе от {detail.minQuantity} шт. - {detail.firstPrice}{" "}
                руб.
              </div>
              <div>
                При заказе от {detail.secondQuantity} шт. - {detail.secondPrice}{" "}
                руб.
              </div>
              <div>
                При заказе от {detail.thirdQuantity} шт. - {detail.thirdPrice}{" "}
                руб.
              </div>
            </>
          }
        >
          <span>{detail.firstPrice} руб.</span>
        </Tooltip>
      ),
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
    if (!searchQuery.trim()) {
      setData([]);
      return;
    }

    setSearchQuery(searchQuery);

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
      const response = await api.get<SellerData[]>("/api", {
        params: filteredData,
      });

      const formattedData = response.data.map((item) => ({
        sellerInfo: item.sellerInfo,
        details: item.response.map((detail) => ({
          ...detail,
          id: `${item.sellerInfo.id}-${detail.name}`,
          manufacturer: item.sellerInfo.companyName,
          sellerInfo: item.sellerInfo,
        })),
      }));

      setData(formattedData);
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
            <Tooltip label={<>{rating}</>}>
              <Rating
                value={rating || 0}
                onChange={(value) => setRating(value)}
                fractions={4}
              />
            </Tooltip>
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
            data={["Москва", "Санкт-Петербург", "Казань"]}
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
      {searchQuery.trim() &&
        (data.length > 0 ? (
          data.map((seller) => (
            <div key={seller.sellerInfo.id} className={styles.sellerBlock}>
              <div className={styles.companyInfo}>
                <h2>{seller.sellerInfo.companyName}</h2>
                <div className={styles.ratingView}>
                  <Rating
                    value={seller.sellerInfo.rating}
                    fractions={4}
                    readOnly
                  />
                  {seller.sellerInfo.rating.toFixed(2)}
                </div>
              </div>
              <ReusableTable columns={columns} data={seller.details} />
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>
            К сожалению, продавцы с такими деталями не найдены
          </h1>
        ))}
    </div>
  );
};

export { MainPage };
