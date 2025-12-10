import { useState } from "react";
import ctdLogo from "./assets/mono-blue-logo.svg";
import "./App.css";
import inventoryData from "./assets/inventory.json";
import Header from "./Header.jsx";
import InventoryList from "./InventoryList.jsx";
import ProductCard from "./ProductCard";

function App() {
  const [inventory, setInvetory] = useState(inventoryData.inventory);

  const promoteItem = () => {
    return (
      <ProductCard
        name="Limited Edition Tee!"
        description="Special limited edition neon gree shirt with a metallic Code The Dream Logo shinier than the latest front-end framework! Signed by the legendary Frank!"
      />
    );
  };

  return (
    <main>
      <Header />
      <InventoryList inventory={inventory}>{promoteItem()}</InventoryList>
    </main>
  );
}

export default App;
