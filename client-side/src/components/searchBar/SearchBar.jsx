import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.scss";

const typesButton = ["buy", "rent"];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleClick = (value) => {
    setQuery((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleChange = (event) => {
    setQuery((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
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
        <input
          type="text"
          name="city"
          placeholder="City Location"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          max={10000000}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          max={10000000}
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
        >
          <button>
            <img src="/search.png" alt="search_button" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
