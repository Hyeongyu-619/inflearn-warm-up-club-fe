// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./App.css";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <Header
        onSearch={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
