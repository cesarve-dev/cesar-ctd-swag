import { useEffect } from "react";
import ctdLogo from "../assets/icons/mono-blue-logo.svg";
import shoppingCart from "../assets/icons/shoppingCart.svg";

function Header({ cart, handleOpenCart }) {
  const getItemCount = () => {
    return cart.reduce((acc, item) => acc + item.itemCount, 0);
  };

  return (
    <div className="coming-soon">
      <div style={{ height: 100, width: 100 }}>
        <img src={ctdLogo} alt="Code The Dream logo" />
      </div>
      <h1>CTD Swag</h1>
      <div className="shoppingCart">
        <button type="button" onClick={handleOpenCart}>
          <img src={shoppingCart} alt="shopping cart icon" />
          <p className="cartCount">{getItemCount()}</p>
        </button>
      </div>
    </div>
  );
}

export default Header;
