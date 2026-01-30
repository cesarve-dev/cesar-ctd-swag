import { useEffect, useState, useRef } from "react";
import "./App.css";
import inventoryData from "./assets/inventory.json";
import Header from "./shared/Header.jsx";
import Footer from "./shared/Footer.jsx";
import InventoryList from "./features/ProductList/InventoryList.jsx";
import Cart from "./features/Cart/Cart.jsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [inventory, setInvetory] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleCloseCart() {
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }

  function handleOpenCart() {
    if (!isCartOpen) {
      setIsCartOpen(true);
    }
  }

  //load inventory
  useEffect(() => {
    setInvetory([...inventoryData.inventory]);
  }, []); //<--- don't forget the dependency array or you can end up with an infinite loop!!

  function handleAddItemToCart(id) {
    const inventoryItem = inventory.find((item) => item.id === id);
    if (!inventoryItem) {
      console.error("cart error: item not found");
      return;
    }
    const itemToUpdate = cart.find((item) => item.id === id);
    let updatedCartItem;
    if (itemToUpdate) {
      updatedCartItem = {
        ...itemToUpdate,
        itemCount: itemToUpdate.itemCount + 1,
      };
    } else {
      updatedCartItem = { ...inventoryItem, itemCount: 1 };
    }
    setCart([...cart.filter((item) => item.id !== id), updatedCartItem]);
  }

  function addItemCart(item) {
    setCart([...cart, item]);
  }

  function removeItemCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart([...updatedCart]);
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${baseUrl}/products`);
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        const products = await resp.json();
        console.log(products);
        setInventory([...products]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <Header cart={cart} handleOpenCart={handleOpenCart} />
      <main>
        <InventoryList
          inventory={inventory}
          handleAddItemToCart={handleAddItemToCart}
        ></InventoryList>
        {/*`isCartOpen has to be true for the cart to be rendered*/}
        {isCartOpen && (
          <Cart
            cart={cart}
            setCart={setCart}
            handleCloseCart={handleCloseCart}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
