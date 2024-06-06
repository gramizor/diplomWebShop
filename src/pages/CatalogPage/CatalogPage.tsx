import React, { useState } from "react";
import { Button } from "@mantine/core";
import classNames from "clsx";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Passive_Components",
    subcategories: [{ name: "Resistors" }, { name: "Capacitors" }],
  },
  {
    name: "Integrated_Circuits",
    subcategories: [{ name: "Microcontrollers" }, { name: "Op-Amps" }],
  },
  {
    name: "Semiconductors",
    subcategories: [{ name: "Diodes" }, { name: "Transistors" }],
  },
  {
    name: "Display_Modules",
    subcategories: [{ name: "LCD" }, { name: "OLED" }],
  },
  {
    name: "Electromechanical",
    subcategories: [{ name: "Relays" }, { name: "Switches" }],
  },
];

const CatalogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className={styles.catalog}>
      {categories.map((category, index) => (
        <div key={index} className={styles.categoryContainer}>
          <Button
            color="#0055BB"
            onClick={() => setActiveCategory(index)}
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
                  onClick={() => {
                    navigate(`/catalog/${category.name}/${subcategory.name}`);
                  }}
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
