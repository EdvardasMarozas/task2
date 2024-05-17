import React, { useEffect, useState } from "react";
import styles from "./CartPage.module.css";

const defaultCard = [];
function CartPage() {
  interface Item {
    id: number;
    name: string;
    price: number;
    photo: string;
    quantity: number;
    totalPrice: number;
  }
  const handleRemoveFromCart = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    removeFromCart(index);
  };

  const [Cart, setCartItems] = useState<Item[]>(defaultCard);
  const totalQuantity = Cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    if (Cart !== defaultCard) {
      saveCartToLocalStorage(Cart);
    }
  }, [Cart]);

  const getCartFromLocalStorage = (): Item[] => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  };

  const saveCartToLocalStorage = (cart: Item[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleIncrement = (productId: number) => {
    const updatedCart = Cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(updatedCart);
  };

  const handleDecrement = (productId: number) => {
    const updatedCart = Cart.map((item) =>
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
    return Cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  function removeFromCount(productId: number) {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 1) - 1, 1),
    }));
  }

  const updateCartItems = (updatedCart: Item[]) => {
    setCartItems(updatedCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...Cart];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.cartpage}>
      <h2 className="bg-success text-light py-3 w-100 text-center mb-3">
        Shopping Cart
      </h2>
      <hr />
      <ul className={styles.cart} style={{ padding: 0 }}>
        {Cart.map((item, index) => (
          <li key={index}>
            <div>
              <a href="#">
                <img src={item.photo} alt={item.name} />
              </a>
            </div>
            <div style={{ height: "200px", width: "100%" }}>
              <p className={styles.price}>
                Price(1) <span className="text-danger">{item.price}€</span>
              </p>
              <h5 className="w-50 text-center pb-4">{item.name}</h5>
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
                TotalPrice: {item.price * item.quantity}€
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
      <h3
        className="py-3 px-2 text-center"
        style={{ backgroundColor: "lightgray" }}
      >
        Total: {calculateTotal().toFixed(2)}€
      </h3>
      <button className="btn btn-success w-25 mt-3">Checkout</button>
      <button
        className="btn btn-dark w-25 mt-3"
        onClick={() => (window.location.href = "/")}
      >
        Go Back
      </button>
    </div>
  );
}

export default CartPage;
