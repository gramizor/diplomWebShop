import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Button, Group, Rating } from "@mantine/core";
import { RoutesEnum } from "../../app/routes";
import api from "../../app/api";

interface Seller {
  id: string;
  companyName: string;
  rating: number;
  physics: boolean;
  city: string;
  zip: string;
  businessAddress: string;
  inn: string;
  kpp: string;
  phoneNumber: string;
  email: string;
  flagManufacturer: boolean;
  favoriteFlag?: boolean;
  blacklistFlag?: boolean;
}

const SellerInfo = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isBlacklisted, setIsBlacklisted] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchSellerInfo = async () => {
    setLoading(true);
    try {
      const response = await api.post("/seller/filter", {
        companyName: companyName,
      });

      if (response.data && response.data.length > 0) {
        const sellerData = response.data[0];

        const [favoriteResponse, blacklistResponse] = await Promise.all([
          api.get(`/sellersList?favoriteFlag=true`),
          api.get(`/sellersList?favoriteFlag=false`),
        ]);

        const isFavorite = favoriteResponse.data.some(
          (s: Seller) => s.sellerId === sellerData.id
        );
        const isBlacklisted = blacklistResponse.data.some(
          (s: Seller) => s.sellerId === sellerData.id
        );

        setIsFavorite(isFavorite);
        setIsBlacklisted(isBlacklisted);

        setSeller({
          ...sellerData,
          favoriteFlag: isFavorite,
          blacklistFlag: isBlacklisted,
        });
      } else {
        setSeller(null);
      }
    } catch (error) {
      console.error("Error fetching seller data:", error);
      setSeller(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyName) {
      fetchSellerInfo();
    }
  }, [companyName]);

  const handleAddToFavorite = async () => {
    if (!seller) return;
    try {
      await api.post("/sellersList", {
        sellerId: seller.id,
        favoriteFlag: true,
        blackListFlag: false,
      });
      fetchSellerInfo();
    } catch (error) {
      console.error("Error adding to favorite:", error);
    }
  };

  const handleAddToBlacklist = async () => {
    if (!seller) return;
    try {
      await api.post("/sellersList", {
        sellerId: seller.id,
        favoriteFlag: false,
        blackListFlag: true,
      });
      fetchSellerInfo();
    } catch (error) {
      console.error("Error adding to blacklist:", error);
    }
  };

  const handleRemoveFromFavorite = async () => {
    if (!seller) return;
    try {
      await api.delete(`/sellersList?sellerId=${seller.id}&favoriteFlag=true`);
      fetchSellerInfo();
    } catch (error) {
      console.error("Error removing from favorite:", error);
    }
  };

  const handleRemoveFromBlacklist = async () => {
    if (!seller) return;
    try {
      await api.delete(`/sellersList?sellerId=${seller.id}&blacklistFlag=true`);
      fetchSellerInfo();
    } catch (error) {
      console.error("Error removing from blacklist:", error);
    }
  };

  const handleMoveToFavorite = async () => {
    if (!seller) return;
    try {
      await api.put(`/sellersList/move?sellerId=${seller.id}`, {
        favoriteFlag: true,
        blacklistFlag: false,
      });
      fetchSellerInfo();
    } catch (error) {
      console.error("Error moving to favorite:", error);
    }
  };

  const handleMoveToBlacklist = async () => {
    if (!seller) return;
    try {
      await api.put(`/sellersList/move?sellerId=${seller.id}`, {
        favoriteFlag: false,
        blacklistFlag: true,
      });
      fetchSellerInfo();
    } catch (error) {
      console.error("Error moving to blacklist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      {seller ? (
        <>
          <div>
            <span>Производитель: </span>
            {seller.companyName}
          </div>
          <div>
            <span>Индекс: </span>
            {seller.zip}
          </div>
          <div>
            <span>Город: </span>
            {seller.city}
          </div>
          <div>
            <span>Юридический адрес: </span>
            {seller.businessAddress}
          </div>
          <div>
            <span>ИНН: </span>
            {seller.inn}
          </div>
          <div>
            <span>КПП: </span>
            {seller.kpp}
          </div>
          <div>
            <span>Номер телефона: </span>
            {seller.phoneNumber}
          </div>
          <div>
            <span>email: </span>
            {seller.email}
          </div>
          <div>
            <span>Работает с Физ лицами: </span>
            {seller.physics ? "Да" : "Нет"}
          </div>
          <div>
            <span>Является производителем: </span>
            {seller.flagManufacturer ? "Да" : "Нет"}
          </div>
          <div className={styles.ratingView}>
            <span>Рейтинг: </span>
            <Rating
              value={seller.rating}
              fractions={4}
              readOnly
              className={styles.rating}
            />
            <span className={styles.ratingText}>{seller.rating}</span>
          </div>
          <div>
            {isFavorite
              ? "Находится в избранном списке"
              : isBlacklisted
              ? "Находится в черном списке"
              : "Не находится ни в одном из списков"}
          </div>

          <div className={styles.buttonGroup}>
            {!isFavorite && !isBlacklisted && (
              <div>
                <Group grow>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleAddToFavorite}
                  >
                    Добавить в избранное
                  </Button>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleAddToBlacklist}
                  >
                    Добавить в черный список
                  </Button>
                </Group>
              </div>
            )}
            {isFavorite && (
              <div>
                <Group grow>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleRemoveFromFavorite}
                  >
                    Удалить из избранного
                  </Button>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleMoveToBlacklist}
                  >
                    Переместить в черный список
                  </Button>
                </Group>
              </div>
            )}
            {isBlacklisted && (
              <div>
                <Group grow>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleMoveToFavorite}
                  >
                    Переместить в избранное
                  </Button>
                  <Button
                    className={styles.actionButton}
                    color="#0055bb"
                    onClick={handleRemoveFromBlacklist}
                  >
                    Удалить из черного списка
                  </Button>
                </Group>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>Продавец не найден</div>
      )}

      <Button
        mt={"10px"}
        onClick={() => {
          navigate(RoutesEnum.Sellers);
        }}
        color="#0055bb"
      >
        Вернуться к продавцам
      </Button>
    </div>
  );
};

export default SellerInfo;
