"use client";

import { useState, useEffect } from "react";

export default function PincodeBar() {
  const [open, setOpen] = useState(false);
  const [pincode, setPincode] = useState("");

  /* Lock body scroll when panel is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleApply = (e) => {
    e.preventDefault();
    if (pincode.length === 6) setOpen(false);
  };

  return (
    <>
      {/* ── Bar Strip ── */}
      <div className="pincode-bar">
        <div className="pincode-bar__inner">
          <span className="pincode-bar__prompt">Deliver to:&nbsp;</span>
          <button
            className="pincode-bar__link"
            onClick={() => setOpen(true)}
            aria-label="Enter pincode to check delivery"
          >
            to check delivery
          </button>
        </div>
      </div>

      {/* ── Overlay ── */}
      {open && (
        <div
          className="pincode-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Panel (bottom-sheet on mobile / modal on desktop) ── */}
      <div
        className={`pincode-panel${open ? " pincode-panel--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enter Pincode"
      >
        {/* ── Drag handle (mobile only) ── */}
        <div className="pincode-panel__handle-wrap" aria-hidden="true">
          <div className="pincode-panel__handle" />
        </div>

        {/* ── Content area ── */}
        <div className="pincode-panel__scroll">
          <div className="pincode-panel__content">

            {/* Location banner */}
            <div className="pincode-location-banner">
              <div className="pincode-location-banner__left">
                {/* Location / crosshair SVG — exact from reference */}
                <span className="pincode-location-banner__icon" aria-hidden="true">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="#000" d="M12 2a1 1 0 0 1 .993.883L13 3v1.314a7.754 7.754 0 0 1 6.686 6.687L21 11a1 1 0 0 1 .117 1.993L21 13h-1.314A7.754 7.754 0 0 1 13 19.686V21a1 1 0 0 1-1.993.117L11 21v-1.314A7.754 7.754 0 0 1 4.315 13H3a1 1 0 0 1-.117-1.993L3 11h1.314A7.754 7.754 0 0 1 11 4.315V3a1 1 0 0 1 1-1Zm0 4.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" opacity="0.65" />
                  </svg>
                </span>
                <div className="pincode-location-banner__text">
                  <p className="pincode-location-banner__heading">LOCATION IS NOT ENABLED</p>
                  <p className="pincode-location-banner__sub">Enable location for delivery estimate</p>
                </div>
              </div>
              <button className="pincode-location-banner__btn">Enable</button>
            </div>

            {/* OR divider */}
            <div className="pincode-or">
              <span className="pincode-or__line" aria-hidden="true">
                <svg width="120" height="24" fill="none" viewBox="0 0 155 2">
                  <path stroke="#B2B2B2" strokeLinecap="round" d="M1 1h153" />
                </svg>
              </span>
              <p className="pincode-or__text">OR</p>
              <span className="pincode-or__line" aria-hidden="true">
                <svg width="120" height="24" fill="none" viewBox="0 0 155 2">
                  <path stroke="#B2B2B2" strokeLinecap="round" d="M1 1h153" />
                </svg>
              </span>
            </div>

            {/* Pincode input */}
            <p className="pincode-panel__label">ENTER PINCODE</p>
            <form className="pincode-panel__input-wrap" onSubmit={handleApply}>
              <input
                className="pincode-panel__input"
                inputMode="numeric"
                type="tel"
                maxLength={6}
                placeholder=""
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                aria-label="Enter 6-digit pincode"
              />
              <button type="submit" className="pincode-panel__apply">
                Apply
              </button>
            </form>

          </div>
        </div>

        {/* ── Close ✕ (desktop only) ── */}
        <button
          className="pincode-panel__close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17.7176 17.7142L6.28906 6.28564" stroke="#000" strokeWidth="0.888889" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.7176 6.28564L6.28906 17.7142" stroke="#000" strokeWidth="0.888889" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
