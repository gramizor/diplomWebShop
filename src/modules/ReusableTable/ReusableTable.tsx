import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  url?: (item: T) => string;
  btnProps?: string;
}

interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

const ReusableTable = <T extends { id: string }>({
  data,
  columns,
  url,
  btnProps,
}: TableProps<T>) => {
  const navigate = useNavigate();

  const handleDetailClick = (item: T) => {
    if (url) {
      navigate(url(item));
    }
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
          {url && <th className={styles.th}></th>}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex} className={styles.tr}>
            {columns.map((column, colIndex) => (
              <td className={styles.td} key={colIndex}>
                {column.accessor(item)}
              </td>
            ))}
            {url && (
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
                  {btnProps}
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReusableTable;
