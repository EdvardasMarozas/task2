import React, { useState, useEffect } from "react";
//@ts-ignore
import styles from "./Categories.module.css";

function Categories() {
  interface Category {
    id: number;
    title: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:3306/api/categories/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles.categories}>
      {categories.map((category) => (
        <li key={category.id}>
          <h1>
            <a href={`/category/${category.id}`}>{category.title}</a>
          </h1>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
