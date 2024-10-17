"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decreaseItemQuantity, addItem } from "../redux/slices/cartSlice";
import Image from "next/image";
import styles from "./page.module.css";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrease = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(addItem(item));
    }
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseItemQuantity(id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <h1>장바구니</h1>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={150}
            className={styles.cartImage}
          />
          <div>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div>
            <button
              className={styles.button}
              onClick={() => handleDecrease(item.id)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className={styles.button}
              onClick={() => handleIncrease(item.id)}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <h2>합계: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default CartPage;
