"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSearchBar from "./AnimatedSearchBar";

export default function Header() {
  return (
    <header className="header">

      {/* ── Left: Hamburger ── */}
      <div className="header-left">
        <button className="icon-btn" aria-label="Open menu">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Menu.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>
      </div>

      {/* ── Mobile: animated search bar fills remaining space ── */}
      <AnimatedSearchBar className="search-bar--mobile" />

      {/* ── Center: Logo (desktop only) ── */}
      <div className="header-center">
        <Link href="/" className="logo-link" aria-label="Home">
          <Image
            src="/gaaba.svg"
            alt="Brand logo"
            width={108}
            height={22}
            priority
            className="logo-img"
          />
        </Link>
      </div>

      {/* ── Right: Desktop search + icons ── */}
      <div className="header-right">
        <AnimatedSearchBar className="search-bar--desktop" />

        {/* Account */}
        <button className="icon-btn" aria-label="My account">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/account.svg" alt="" aria-hidden="true" width={20} height={20} />
        </button>

        {/* Cart */}
        <button className="icon-btn cart-btn" aria-label="Shopping cart">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Cart.svg" alt="" aria-hidden="true" width={22} height={22} />
          <span className="cart-badge" aria-label="0 items">0</span>
        </button>
      </div>

    </header>
  );
}
