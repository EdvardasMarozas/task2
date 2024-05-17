import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Products.module.css";
import ShoppingCartIcon from "../Cart/ShoppingCart/ShoppingCartIcon";
import Cart from "../Cart/Cart";
import "../Cart/ShoppingCart/ShoppingCart.css";

const defaultCard = [];
function Products() {
  interface Product {
    id: number;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }

  const id = useParams().id;
  const [productCounts, setProductCounts] = useState<{ [key: number]: number }>(
    {}
  );
  const [cartItems, setCartItems] = useState<Product[]>(defaultCard);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3306/api/categories/${id}/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const savedCart = getCartFromLocalStorage();
        setCartItems(savedCart);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cartItems !== defaultCard) {
      saveCartToLocalStorage(cartItems);
    }
  }, [cartItems]);

  const getCartFromLocalStorage = (): Product[] => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  };

  const saveCartToLocalStorage = (cart: Product[]): void => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  function addToCount(productId: number) {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 1) + 1,
    }));
  }

  function removeFromCount(productId: number) {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 1) - 1, 1),
    }));
  }

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleRemoveFromCart = (index: number) => {
    removeFromCart(index);
  };

  const addToCart = (item: Product) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + (productCounts[item.id] || 1),
          };
        }
        return cartItem;
      });
      setCartItems(updatedCart);
    } else {
      const response = fetch(`http://localhost:3306/api/products/${item.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newItem = { ...item, quantity: productCounts[item.id] || 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="app">
        <ShoppingCartIcon itemCount={totalQuantity} onClick={toggleCart} />
        {showCart && (
          <div className="cart-overlay" onClick={toggleCart}>
            <div className="">
              <Cart
                items={cartItems}
                removeFromCart={handleRemoveFromCart}
                updateCartItems={setCartItems}
              />
            </div>
          </div>
        )}
        <button
          className="btn btn-dark position-relative mx-2 mt-2"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <ul className={styles.products}>
          {products.map((product) => (
            <li key={product.id} className="bg-light">
              <a href="#">
                <img src={product.photo} alt="" />
              </a>
              <h3 className="mt-4">{product.name}</h3>
              <p className="text-success">{product.price}€</p>
              <div className="d-flex justify-content-center gap-5 align-items-center">
                <div className="d-flex justify-content-center h-100 align-items-center">
                  <button
                    className="h-100 border border-dark mt-0 onhoverlight"
                    onClick={() => removeFromCount(product.id)}
                  >
                    -
                  </button>
                  <div className="bg-light h-100 border text border-dark px-1">
                    {productCounts[product.id] || 1}
                  </div>
                  <button
                    className="h-100 border border-dark mt-0 onhoverlight"
                    onClick={() => addToCount(product.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Products;
