"use client";

import Link from "next/link";
import "./styles/styles.css";
export default function Home() {
  return (
    <div className="home-container">
      <h1>퀴즈 앱에 오신 것을 환영합니다!</h1>
      <div className="link-container">
        <Link href="/question" className="home-link">
          Question
        </Link>
        <Link href="/state" className="home-link">
          State
        </Link>
        <Link href="/quiz" className="home-link">
          Quiz
        </Link>
      </div>
    </div>
  );
}
