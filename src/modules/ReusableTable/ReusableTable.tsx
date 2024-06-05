import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@mantine/core";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

const ReusableTable = <T,>({ data, columns }: TableProps<T>) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setActiveRow(index === activeRow ? null : index);
  };

  const handleDetailClick = (item: T) => {
    console.log("Go to row:", item);
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map((column, index) => (
            <th className={styles.th} key={index}>
              {column.header}
            </th>
          ))}
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${styles.tr} ${
              rowIndex === activeRow ? styles.activeRow : ""
            }`}
            onClick={() => handleRowClick(rowIndex)}
          >
            {columns.map((column, colIndex) => (
              <td className={styles.td} key={colIndex}>
                {column.accessor(item)}
              </td>
            ))}
            <td className={styles.td}>
              <Button
                className={styles.detailButton}
                fullWidth
                color="#0055BB"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetailClick(item);
                }}
              >
                Открыть
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
