"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const homeActive   = isActive("/");
  const exploreActive = isActive("/explore");
  const newActive    = isActive("/new");
  const cartActive   = isActive("/cart");
  const profileActive = isActive("/profile");

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">

      {/* Home */}
      <Link
        href="/"
        className={`bottom-nav__item${homeActive ? " bottom-nav__item--active" : ""}`}
        aria-label="Home"
      >
        <span className="bottom-nav__icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={homeActive ? "/clicked_Home.svg" : "/Home.svg"}
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
          />
        </span>
        <span className="bottom-nav__label">Home</span>
      </Link>

      {/* Explore */}
      <Link
        href="/explore"
        className={`bottom-nav__item${exploreActive ? " bottom-nav__item--active" : ""}`}
        aria-label="Explore"
      >
        <span className="bottom-nav__icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={exploreActive ? "/clicked_explore.svg" : "/Explore.svg"}
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
          />
        </span>
        <span className="bottom-nav__label">Explore</span>
      </Link>

      {/* NEW — center */}
      <Link
        href="/new"
        className={`bottom-nav__item bottom-nav__item--new${newActive ? " bottom-nav__item--active" : ""}`}
        aria-label="New arrivals"
      >
        <span className={`bottom-nav__new-pill${newActive ? " bottom-nav__new-pill--active" : ""}`}>
          NEW
        </span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className={`bottom-nav__item${cartActive ? " bottom-nav__item--active" : ""}`}
        aria-label="Cart"
      >
        <span className="bottom-nav__icon bottom-nav__icon--cart">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Cart.svg" alt="" aria-hidden="true" width={22} height={22} />
        </span>
        <span className="bottom-nav__label">Cart</span>
      </Link>

      {/* Profile */}
      <Link
        href="/profile"
        className={`bottom-nav__item${profileActive ? " bottom-nav__item--active" : ""}`}
        aria-label="Profile"
      >
        <span className="bottom-nav__icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/account.svg" alt="" aria-hidden="true" width={22} height={22} />
        </span>
        <span className="bottom-nav__label">Profile</span>
      </Link>

    </nav>
  );
}
