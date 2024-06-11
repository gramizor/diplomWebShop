import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../app/config";
import { RoutesEnum } from "../../app/routes";

const ConfirmMail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/confirm/${token}`)
        .then((response) => {
          console.log("Email confirmed:", response.data);
          navigate(RoutesEnum.Auth);
        })
        .catch((error) => {
          console.error("Error confirming email:", error);
        });
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Подтверждение электронной почты...</h1>
    </div>
  );
};

export default ConfirmMail;
