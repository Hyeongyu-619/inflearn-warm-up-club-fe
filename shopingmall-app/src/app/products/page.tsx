"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addItem } from "../redux/slices/cartSlice";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const dispatch = useDispatch();
  const router = useRouter();

  const categories = ["All", "Whiskey", "Gin", "Rum", "Vodka", "Liquor"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleCardClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className={styles.productsContainer}>
      <h1>Products</h1>
      <div className={styles.categorySelect}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.selected : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleCardClick(product.id)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={300}
              className={styles.productImage}
            />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>${product.price.toFixed(2)}</p>
            <button
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addItem({ ...product, quantity: 1 }));
              }}
            >
              장바구니에 담기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
