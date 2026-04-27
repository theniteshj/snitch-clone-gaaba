"use client";

import { useState, useEffect, useRef } from "react";

const PLACEHOLDERS = [
  "Search 'LINEN SHIRTS'",
  "Search 'BLACK KURTA'",
  "Search 'COTTON PANTS'",
  "Search 'OVERSIZED TEE'",
  "Search 'CARGO SHORTS'",
  "Search 'POLO SHIRTS'",

];

export default function AnimatedSearchBar({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);   // controls opacity + translateY
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const isFocused = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFocused.current || value) return; // pause when typing

      // Slide out
      setVisible(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        // Slide in
        setVisible(true);
      }, 320); // matches CSS transition duration
    }, 2800);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div
      className={`search-bar ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/search.svg" alt="" aria-hidden="true" className="search-icon" />

      <div className="search-input-wrap">
        {/* Real input — transparent, sits on top */}
        <input
          ref={inputRef}
          type="text"
          className="search-input search-input--real"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => { isFocused.current = true; }}
          onBlur={() => { isFocused.current = false; }}
          aria-label="Search products"
        />

        {/* Animated placeholder — hidden when user has typed */}
        {!value && (
          <span
            className="search-placeholder-animated"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-8px)",
            }}
            aria-hidden="true"
          >
            {PLACEHOLDERS[index]}
          </span>
        )}
      </div>
    </div>
  );
}
