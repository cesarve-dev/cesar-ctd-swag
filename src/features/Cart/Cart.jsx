import { useState } from "react";
import CartItem from "./CartItem";

function Cart({ cart, handleCloseCart, setCart }) {
  const [workingCart, setWorkingCart] = useState(cart);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const getWorkingCartPrice = () => {
    return workingCart
      .reduce((acc, item) => acc + item.price * item.itemCount, 0)
      .toFixed(2);
  };

  function handleUpdateField({ event, id }) {
    event.preventDefault();
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
    const targetProduct = cart.find((item) => item.id === id); //object
    const targetIndex = cart.findIndex((item) => item.id === id);
    if (!targetProduct) {
      console.error("cart error: item not found");
      return;
    }
    //rejects negative values or if user deletes value
    if (event.target.value < 0 || event.target.value === "") {
      return;
    }
    //create new object instead of updating old
    const updatedProduct = {
      ...targetProduct,
      itemCount: parseInt(event.target.value, 10),
    };
    //avoid re-ordering array when updating cart item
    setWorkingCart([
      ...workingCart.slice(0, targetIndex),
      updatedProduct,
      ...workingCart.slice(targetIndex + 1),
    ]);
  }
  function handleCancel(e) {
    e.preventDefault();
    setIsFormDirty(false);
    setWorkingCart([...cart]); //why not just cart?
  }

  function removeEmptyItems(cart) {
    return cart.filter((i) => i.itemCount !== 0);
  }

  function handleConfirm(e) {
    e.preventDefault();
    setWorkingCart(removeEmptyItems(workingCart));
    setCart(removeEmptyItems(workingCart));
    setIsFormDirty(false);
  }

  return (
    <>
      <div className="cartScreen"></div>
      {/*
   .cartScreen covers the product list with
   a div that has a blur effect placed on it.
   this makes the product buttons unclickable
  */}
      <div className="cartListWrapper">
        {workingCart.length === 0 ? (
          <p>cart is empty</p>
        ) : (
          <form>
            <ul className="cartList">
              {workingCart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    onHandleItemUpdate={handleUpdateField}
                  />
                );
              })}
            </ul>
            {isFormDirty && (
              <div>
                <button onClick={handleConfirm}>Confirm Update</button>
                <button onClick={handleCancel}>Cancel Update</button>
              </div>
            )}
          </form>
        )}
        <h2>Cart Total: ${getWorkingCartPrice() || 0}</h2>
        <button onClick={handleCloseCart}>Close Cart</button>
      </div>
    </>
  );
}

export default Cart;
