"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addItem } from "../../redux/slices/cartSlice";
import styles from "./page.module.css";
import Image from "next/image";
import { Product } from "../../types";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const products = useSelector((state: RootState) => state.products.items);
  const id = params.id;

  useEffect(() => {
    if (id) {
      const selectedProduct = products.find(
        (product) => product.id === Number(id)
      );
      setProduct(selectedProduct || null);
    }
  }, [id, products]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productImageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h1>{product.name}</h1>
        <h2>${product.price.toFixed(2)}</h2>
        <p>{product.description}</p>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleAddToCart(product)}
          >
            장바구니에 담기
          </button>
          <button
            className={styles.button}
            onClick={() => router.push("/cart")}
          >
            장바구니로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
