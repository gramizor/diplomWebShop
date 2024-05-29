import { Button } from "@mantine/core";
import React, { useState } from "react";
import classNames from "clsx";
import styles from "./styles.module.css";

interface Subcategory {
  name: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    name: "Категория 1",
    subcategories: [{ name: "Подкатегория 1.1" }, { name: "Подкатегория 1.2" }],
  },
  {
    name: "Категория 2",
    subcategories: [{ name: "Подкатегория 2.1" }, { name: "Подкатегория 2.2" }],
  },
  {
    name: "Категория 3",
    subcategories: [{ name: "Подкатегория 3.1" }, { name: "Подкатегория 3.2" }],
  },
  {
    name: "Категория 4",
    subcategories: [{ name: "Подкатегория 4.1" }, { name: "Подкатегория 4.2" }],
  },
  {
    name: "Категория 5",
    subcategories: [{ name: "Подкатегория 5.1" }, { name: "Подкатегория 5.2" }],
  },
  {
    name: "Категория 6",
    subcategories: [{ name: "Подкатегория 6.1" }, { name: "Подкатегория 6.2" }],
  },
];

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <div className={styles.catalog}>
      {categories.map((category, index) => (
        <div key={index} className={styles.categoryContainer}>
          <Button
            color="#0055BB"
            onClick={() => handleCategoryClick(index)}
            className={classNames(styles.category)}
            variant={activeCategory === index ? "filled" : "outline"}
          >
            {category.name}
          </Button>
          {activeCategory === index && (
            <div className={styles.subcategories}>
              {category.subcategories.map((subcategory, subIndex) => (
                <Button
                  color="#0055BB"
                  key={subIndex}
                  className={styles.subcategory}
                  variant="light"
                >
                  {subcategory.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CatalogPage;
