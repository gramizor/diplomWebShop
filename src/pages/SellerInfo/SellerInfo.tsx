import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../app/config";
import { Button, Rating } from "@mantine/core";
import { RoutesEnum } from "../../app/routes";

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
}

const SellerInfo = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const [seller, setSeller] = useState<Seller | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/seller/filter`, {
          companyName: companyName,
        });
        if (response.data && response.data.length > 0) {
          setSeller(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    if (companyName) {
      fetchSellerInfo();
    }
  }, [companyName]);

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
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
      <Button
        mt={"10px"}
        color={"#0055bb"}
        onClick={() => {
          navigate(RoutesEnum.Sellers);
        }}
      >
        Вернуться
      </Button>
    </div>
  );
};

export default SellerInfo;
