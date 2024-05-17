import React from "react";
import ReactDOM from "react-dom/client";
import Categories from "./Components/Categories/Categories.tsx";
import CartPage from "./Components/Cart/CartPage/CartPage.tsx";
import CartPageById from "./Components/Cart/CartPage/CartPageById.tsx";
import Products from "./Components/Products/Products.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Categories />} />
      <Route path="/category/:id" element={<Products />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/:id" element={<CartPageById />} />
    </>
  )
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
