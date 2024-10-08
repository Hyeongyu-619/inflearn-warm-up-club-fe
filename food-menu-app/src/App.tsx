import React, { useState } from "react";
import { menuData } from "./menu";
import "./App.css";

const categories = ["All", "Korean", "American", "Scotch", "Japanese", "Irish"];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredMenu =
    selectedCategory === "All"
      ? menuData
      : menuData.filter((item) => item.category === selectedCategory);

  return (
    <div className="App">
      <h1>WHISKIES OF THE WORLD</h1>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="menu">
        {filteredMenu.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.imageUrl} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span className="price">Price: ${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
