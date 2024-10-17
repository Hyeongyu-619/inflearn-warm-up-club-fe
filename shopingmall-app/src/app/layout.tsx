"use client";

import "./styles/globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { FaShoppingCart } from "react-icons/fa";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <footer>© Bottle Shop. All rights reserved.</footer>
        </Providers>
      </body>
    </html>
  );
}

function Header() {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/products">Bottle Shop</Link>
          </li>
          <li style={{ marginLeft: "auto" }}>
            <Link href="/cart">
              <FaShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
