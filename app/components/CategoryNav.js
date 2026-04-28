"use client";

import { useState } from "react";

const CATEGORIES = [
  "Discover",
  "Shirts",
  "T-shirts",
  "Jeans",
  "Trousers",
  "Cargo Pants",
  "Shoes",
  "Overshirt",
  "Plus-Size",
  "Shorts",
  "Sunglasses",
  "Perfumes",
];

export default function CategoryNav() {
  const [active, setActive] = useState("Discover");

  return (
    <nav className="category-nav" aria-label="Shop categories">
      <div className="category-nav__track">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-nav__item${active === cat ? " category-nav__item--active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}
