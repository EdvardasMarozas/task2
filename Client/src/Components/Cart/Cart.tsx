import React, { useState } from "react";
import styles from "./Cart.module.css";

interface Item {
  id: number;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartProps {
  items: Item[];
  removeFromCart: (index: number) => void;
  updateCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Cart: React.FC<CartProps> = ({
  items,
  removeFromCart,
  updateCartItems,
}) => {
  const handleRemoveFromCart = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    removeFromCart(index);
  };

  const handleIncrement = (productId: number) => {
    const updatedCart = items.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(updatedCart);
  };

  const handleDecrement = (productId: number) => {
    const updatedCart = items.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    updateCartItems(updatedCart);
  };

  const [productCounts, setProductCounts] = useState<{ [key: number]: number }>(
    {}
  );

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  function addToCount(productId: number) {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  }

  function removeFromCount(productId: number) {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 1) - 1, 1),
    }));
  }

  return (
    <div className="cart" onClick={(e) => e.stopPropagation()}>
      <h2 className="bg-success text-light py-3 w-100 text-center mb-3">
        Shopping Cart
      </h2>
      <ul className={styles.cart} style={{ padding: 0 }}>
        {items.map((item, index) => (
          <li key={index}>
            <div>
              <a href="#">
                <img src={item.photo} alt={item.name} />
              </a>
            </div>
            <div>
              <h5>{item.name}</h5>
              <div className="d-flex justify-content-center gap-5 align-items-center">
                <div className="d-flex justify-content-center h-100 align-items-center">
                  <button
                    className="h-100 border border-dark mt-0 onhoverlight"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <div
                    className="bg-light border text border-dark px-1"
                    style={{ height: "28px" }}
                  >
                    {item.quantity}
                  </div>
                  <button
                    className="h-100 border border-dark mt-0 onhoverlight"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
                {item.price * item.quantity}€
              </div>
            </div>
            <button
              className={styles.remove}
              onClick={(e) => handleRemoveFromCart(index, e)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <h3 className="py-3 text-center" style={{ backgroundColor: "lightgray" }}>
        Total: {calculateTotal().toFixed(2)}€
      </h3>
      <button className="btn btn-success w-100 mt-3">Checkout</button>
      <button
        className="btn btn-dark w-100 mt-3"
        onClick={() => (window.location.href = "/cart/")}
      >
        {" "}
        Go To Cart
      </button>
    </div>
  );
};

export default Cart;
