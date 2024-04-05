import React, { useState } from "react";
import "./SearchBar.scss";

const typesButton = ["buy", "rent"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleClick = (value) => {
    setQuery((prev) => ({
      ...prev,
      type: value,
    }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {typesButton.map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form action="">
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          max={10000000}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          max={10000000}
        />
        <button>
          <img src="/search.png" alt="search_button" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
