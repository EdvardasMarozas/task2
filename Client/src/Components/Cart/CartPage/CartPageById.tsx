import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CartPage.module.css";

function CartPage() {
  interface Item {
    id: number;
    name: string;
    price: number;
    photo: string;
    quantity: number;
    totalPrice: number;
  }

  const [Cart, setCartItems] = useState<Item[]>([]);
  const totalQuantity = Cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const id = useParams().id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3306/api/carts/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const cart = [];
        for (let i = 0; i < data.length; i++) {
          //@ts-ignore
          cart.push(data[i].products);

          data[i].products.quantity = data[i].quantity;
        }
        setCartItems(cart);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleIncrement = (productId: number) => {
    const response = fetch(`http://localhost:3306/api/carts/${id}/increment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, cart_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const updatedCart = Cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartItems(updatedCart);
  };

  const handleDecrement = (productId: number, quantity: number) => {
    const response = fetch(`http://localhost:3306/api/carts/${id}/decrement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

  const handleRemoveFromCart = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
    item_id: number
  ) => {
    event.stopPropagation();
    removeFromCart(index, item_id);
  };

  const removeFromCart = (index: number, item_id: number) => {
    const response = fetch(`http://localhost:3306/api/carts/${id}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id }),
    });
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
        {Cart.length
          ? Cart.map((item, index) => (
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
                        className="border border-dark mt-0 onhoverlight"
                        style={{ height: "3vh" }}
                        onClick={() => handleDecrement(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <div
                        className="bg-light border text border-dark px-1"
                        style={{ height: "3vh" }}
                      >
                        {item.quantity}
                      </div>
                      <button
                        className="border border-dark mt-0 onhoverlight"
                        style={{ height: "3vh" }}
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
                  onClick={(e) => handleRemoveFromCart(index, e, item.id)}
                >
                  X
                </button>
              </li>
            ))
          : "No items in cart"}
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
