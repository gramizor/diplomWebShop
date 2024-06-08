import { useEffect, useState } from "react";
import api from "../../app/api";
import ReusableTable from "../../modules/ReusableTable/ReusableTable";

interface Seller {
  id: string;
  sellerId: number;
  name: string;
  favoriteFlag: boolean;
  blacklistFlag: boolean;
}

const FavoriteSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/sellersList", {
        params: {
          favoriteFlag: true,
        },
      })
      .then((response) => {
        setSellers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sellers list:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      header: "Name",
      accessor: (item: Seller) => item.name,
    },
  ];

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Загрузка...</h1>;
  }

  return (
    <div>
      {sellers.length !== 0 ? (
        <ReusableTable<Seller>
          data={sellers}
          columns={columns}
          url={(seller) => `/seller/${seller.name}`}
          btnProps="Подробнее"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Не найдено избранных продавцов.</h1>
      )}
    </div>
  );
};

export default FavoriteSellers;
