import React, { useEffect, useRef, useState } from "react";
import "./ShoppingCartIcon.css";
//@ts-ignore
import logo from "../../../assets/shopping-cart-icon.svg";
interface ShoppingCartIconProps {
  itemCount: number;
  onClick: () => void;
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({
  itemCount,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartIconRef.current &&
        !cartIconRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    onClick();
    setClicked(true);
  };
  return (
    <div
      ref={cartIconRef}
      className={`shopping-cart-icon ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <img src={logo} alt="Shopping Cart" />
      {itemCount > 0 && <span className="item-count">{itemCount}</span>}
    </div>
  );
};

export default ShoppingCartIcon;
