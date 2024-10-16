// src/app/layout.tsx
import "./styles/styles.css";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header>
          <div className="header-content">
            <nav>
              <Link href="/">Home</Link>
              <Link href="/question">Question</Link>
              <Link href="/state">State</Link>
              <Link href="/quiz">Quiz</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
