import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";
import styles from "./styles.module.css";
import BASE_URL from "../../app/config";

interface Detail {
  id: string;
  name: string;
  manufacturer: string;
}

const CatalogInfo = () => {
  const { categoryName, subcategoryName } = useParams();
  const [data, setData] = useState<Detail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/detail/${categoryName}`, {
          params: {
            page: 0,
            size: 10,
            sort: "name",
          },
        });

        console.log(response.data);

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError("Полученные данные не являются массивом");
        }

        setLoading(false);
      } catch (error) {
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  const columns = [
    {
      header: "Наименование",
      accessor: (detail: Detail) => detail.name,
    },
    {
      header: "Производитель",
      accessor: (detail: Detail) => detail.manufacturer,
    },
  ];

  return (
    <div>
      <h2 className={styles.text}>
        Детали, которые находятся в {categoryName}/{subcategoryName}
      </h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ReusableTable<Detail>
          data={data}
          columns={columns}
          url="/analog"
          btnProps="Искать деталь"
        />
      )}
    </div>
  );
};

export default CatalogInfo;
