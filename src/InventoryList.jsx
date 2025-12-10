import { Children } from "react";
import ProductCard from "./ProductCard.jsx";

const InventoryList = ({ inventory, children }) => {
  return (
    <ul>
      {children}
      {inventory.map((item) => {
        return (
          <ProductCard
            key={item.id}
            name={item.baseName}
            description={item.baseDescription}
          />
        );
      })}
    </ul>
  );
};

export default InventoryList;
