"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const BANNERS = [
  "/Media/Banner/1774010458.webp",
  "/Media/Banner/1775472623.webp",
  "/Media/Banner/1775472640.webp",
  "/Media/Banner/1775472686.webp",
  "/Media/Banner/1776491438.webp",
];

const TOTAL = BANNERS.length;
const AUTOPLAY_MS = 3500;
const DESKTOP_SLIDE_WIDTH = 508; // fixed 508px per slide on desktop
const DESKTOP_GAP = 8;

// Infinite loop array: [last, 0, 1, 2, 3, 4, first]
// vIndex 0 = clone of last, vIndex 1..5 = real, vIndex 6 = clone of first
const LOOPED = [BANNERS[TOTAL - 1], ...BANNERS, BANNERS[0]];

export default function BannerSlider() {
  const [vIndex, setVIndex] = useState(1);     // start at real slide 0
  const [animated, setAnimated] = useState(true);
  const [progress, setProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(performance.now());

  // Real index for dots
  const realIndex = ((vIndex - 1) + TOTAL) % TOTAL;

  /* ── Compute translateX ── */
  const computeTranslate = useCallback((vi) => {
    if (!containerRef.current) return;
    const cw = containerRef.current.offsetWidth;
    const desktop = cw >= 640;
    setIsDesktop(desktop);

    if (desktop) {
      const sw = DESKTOP_SLIDE_WIDTH; // fixed 508px
      const centerOffset = (cw - sw) / 2;
      setTranslateX(centerOffset - vi * (sw + DESKTOP_GAP));
    } else {
      setTranslateX(-vi * cw);
    }
  }, []);

  useEffect(() => {
    computeTranslate(vIndex);
    const ro = new ResizeObserver(() => computeTranslate(vIndex));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [vIndex, computeTranslate]);

  /* ── Infinite loop: silent jump after edge clone transition ── */
  useEffect(() => {
    if (vIndex === 0) {
      // Showed clone of last → jump to real last (vIndex = TOTAL)
      const t = setTimeout(() => {
        setAnimated(false);
        setVIndex(TOTAL);
        setTimeout(() => setAnimated(true), 30);
      }, 520);
      return () => clearTimeout(t);
    }
    if (vIndex === TOTAL + 1) {
      // Showed clone of first → jump to real first (vIndex = 1)
      const t = setTimeout(() => {
        setAnimated(false);
        setVIndex(1);
        setTimeout(() => setAnimated(true), 30);
      }, 520);
      return () => clearTimeout(t);
    }
  }, [vIndex]);

  /* ── Autoplay + progress ── */
  const goTo = useCallback((vi) => {
    setVIndex(vi);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setVIndex((vi) => vi + 1);
        setProgress(0);
        startTimeRef.current = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [vIndex]);

  /* ── Touch / swipe ── */
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? vIndex + 1 : vIndex - 1);
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="banner-slider"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Sliding track ── */}
      <div
        className="banner-slider__track"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: animated ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
      >
        {LOOPED.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`banner-slider__slide${isDesktop ? " banner-slider__slide--desktop" : " banner-slider__slide--mobile"}`}
            style={{ position: "relative" }}  /* required by Next.js Image fill */
          >
            <Image
              src={src}
              alt={`Banner ${i}`}
              fill
              unoptimized
              priority={i <= 1}
              sizes="(min-width: 640px) 508px, 100vw"
              style={{ objectFit: "cover" }}
            />
            <div className="banner-slider__grad banner-slider__grad--top" />
            <div className="banner-slider__grad banner-slider__grad--bottom" />
          </div>
        ))}
      </div>

      {/* ── Progress dots (based on real index) ── */}
      <div className="banner-slider__dots">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            className="banner-slider__dot-wrap"
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === realIndex ? (
              <div className="banner-slider__dot banner-slider__dot--active">
                <div className="banner-slider__dot-fill" style={{ width: `${progress}%` }} />
              </div>
            ) : (
              <div className="banner-slider__dot" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
