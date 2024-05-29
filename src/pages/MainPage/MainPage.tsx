import styles from "./styles.module.css";
import SearchForm from "../../modules/SearchForm/SearchForm";
import Navbar from "../../components/Navbar/Navbar";

const MainPage = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <SearchForm />
    </div>
  );
};

export { MainPage };
