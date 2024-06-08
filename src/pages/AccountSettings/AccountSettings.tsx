import { Loader, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import BASE_URL from "../../app/config";
import api from "../../app/api";
import styles from "./styles.module.css";

interface UserData {
  name?: string;
  login?: string;
  companyName?: string;
  zip?: string;
  city?: string;
  businessAddress?: string;
  inn?: string;
  kpp?: string;
  phoneNumber?: string;
  email?: string;
  bankName?: string;
  rcBic?: string;
  corrAcc?: string;
  acc?: string;
  indFlag?: boolean;
  responseFormat?: string;
  apiAddress?: string;
}

const AccountSettings = () => {
  const [role] = useState<string | null>(localStorage.getItem("userRole"));
  const [access] = useState<string | null>(localStorage.getItem("accessToken"));
  const [refreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserData>({});
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const fetchData = async (accessToken: string) => {
    if (!role) {
      console.log("Role is not defined");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Fetching data for role:", role);
      let response;
      if (role === "INDIVIDUAL_CUSTOMER" || role === "LEGAL_CUSTOMER") {
        response = await api.get(`${BASE_URL}/consumer`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else if (role === "SUPPLIER" || role === "SUB_SELLER") {
        response = await api.get(`${BASE_URL}/seller`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      console.log("Data fetched:", response?.data);
      setUserData(response?.data);
      setFormData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const refreshAccessToken = async (refreshToken: string) => {
      try {
        const response = await api.post(`${BASE_URL}/refresh`, {
          refresh: refreshToken,
        });
        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        fetchData(newAccessToken);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        setError("Failed to refresh token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userRole");
      }
    };

    if (access) {
      fetchData(access);
    } else if (refreshToken) {
      refreshAccessToken(refreshToken);
    } else {
      setError("No access or refresh token available");
    }
  }, [role, access, refreshToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (role === "INDIVIDUAL_CUSTOMER" || role === "LEGAL_CUSTOMER") {
        await api.put(`${BASE_URL}/consumer`, formData, {
          headers: { Authorization: `Bearer ${access}` },
        });
      } else if (role === "SUPPLIER" || role === "SUB_SELLER") {
        await api.put(`${BASE_URL}/seller`, formData, {
          headers: { Authorization: `Bearer ${access}` },
        });
      }
      setUserData(formData);
      setIsEditable(false);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (access) {
      fetchData(access);
    }
    setIsEditable(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Error loading data</div>;
  }

  const renderInput = (label: string, name: keyof UserData, type = "text") => (
    <div className={styles.textBlock}>
      <span className={styles.label}>{label}:</span>{" "}
      <TextInput
        type={type}
        name={name}
        value={formData[name] ?? ""}
        onChange={handleChange}
        readOnly={!isEditable}
      />
    </div>
  );

  const renderCustomerData = () => (
    <>
      {renderInput("Название компании", "companyName")}
      {renderInput("Почтовый индекс", "zip")}
      {renderInput("Город", "city")}
      {renderInput("Адрес", "businessAddress")}
      {renderInput("ИНН", "inn")}
      {renderInput("КПП", "kpp")}
      {renderInput("Телефон", "phoneNumber")}
      {renderInput("Email", "email")}
    </>
  );

  const renderSellerData = () => (
    <>
      {renderInput("Название банка", "bankName")}
      {renderInput("БИК", "rcBic")}
      {renderInput("Корреспондентский счет", "corrAcc")}
      {renderInput("Название компании", "companyName")}
      {renderInput("Почтовый индекс", "zip")}
      {renderInput("Город", "city")}
      {renderInput("Адрес", "businessAddress")}
      {renderInput("ИНН", "inn")}
      {renderInput("КПП", "kpp")}
      {renderInput("Расчетный счет", "acc")}
      {renderInput("Телефон", "phoneNumber")}
      {renderInput("Email", "email")}
      {renderInput(
        "Флаг индивидуального предпринимателя",
        "indFlag",
        "checkbox"
      )}
      {renderInput("Формат ответа", "responseFormat")}
      {renderInput("Адрес API", "apiAddress")}
    </>
  );

  return (
    <div className={styles.main}>
      {role === "INDIVIDUAL_CUSTOMER" || role === "LEGAL_CUSTOMER"
        ? renderCustomerData()
        : renderSellerData()}
      <div className={styles.buttonContainer}>
        {isEditable ? (
          <>
            <Button
              color="#0055bb"
              className={styles.button}
              onClick={handleSave}
            >
              Сохранить
            </Button>
            <Button
              color="#0055bb"
              className={styles.button}
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button
            className={styles.button}
            onClick={() => {
              setIsEditable(true);
            }}
            color="#0055bb"
          >
            Изменить
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
