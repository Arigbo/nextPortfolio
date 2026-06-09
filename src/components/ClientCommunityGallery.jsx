"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const MAX_RETRIES  = 3;
const RETRY_DELAYS = [1500, 3000, 6000];
const INITIAL_BATCH = 30;
const MORE_BATCH    = 30;

/* ─────────────────────────────────────────────────────────────
   MasonryImage  — self-contained loading + retry
───────────────────────────────────────────────────────────── */
function MasonryImage({ photo, index, onOpen }) {
  const [status,    setStatus]    = useState("loading"); // loading | loaded | retrying | failed
  const [retries,   setRetries]   = useState(0);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearInterval(countRef.current);
  }, []);

  const scheduleRetry = (attempt) => {
    const delay = RETRY_DELAYS[Math.min(attempt, RETRY_DELAYS.length - 1)];
    let rem = Math.ceil(delay / 1000);
    setCountdown(rem);
    setStatus("retrying");
    countRef.current = setInterval(() => {
      rem -= 1;
      setCountdown(rem);
      if (rem <= 0) clearInterval(countRef.current);
    }, 1000);
    timerRef.current = setTimeout(() => {
      clearInterval(countRef.current);
      setStatus("loading");
    }, delay);
  };

  const handleError = () => {
    const next = retries + 1;
    setRetries(next);
    if (next <= MAX_RETRIES) scheduleRetry(retries);
    else setStatus("failed");
  };

  const manualRetry = (e) => {
    e.stopPropagation();
    clearTimeout(timerRef.current);
    clearInterval(countRef.current);
    setRetries(0);
    setStatus("loading");
  };

  const isPending = status === "loading" || status === "retrying";

  return (
    <div
      className={`masonry-item ${status === "loaded" ? "clickable" : ""}`}
      onClick={() => status === "loaded" && onOpen(photo, index)}
      role={status === "loaded" ? "button" : undefined}
      tabIndex={status === "loaded" ? 0 : undefined}
      aria-label={status === "loaded" ? `View photo: ${photo.caption}` : undefined}
      onKeyDown={(e) => e.key === "Enter" && status === "loaded" && onOpen(photo, index)}
    >
      {/* Shimmer skeleton while loading */}
      {isPending && (
        <div className="masonry-skeleton" aria-hidden="true">
          {status === "retrying" && (
            <div className="retry-overlay">
              <div className="retry-spinner" />
              <span className="retry-text">Retry in {countdown}s</span>
            </div>
          )}
        </div>
      )}

      {/* Image — render as long as not permanently failed */}
      {status !== "failed" && (
        <img
          src={`${photo.url}${photo.url.includes("?") ? "&" : "?"}r=${retries}`}
          alt={photo.caption}
          className="masonry-img"
          loading="lazy"
          decoding="async"
          style={{ display: isPending ? "none" : "block" }}
          onLoad={() => setStatus("loaded")}
          onError={handleError}
        />
      )}

      {/* Permanent failure tile — tap to retry */}
      {status === "failed" && (
        <button className="masonry-failed-tile" onClick={manualRetry} aria-label="Tap to retry image">
          <i className="fa-solid fa-rotate-right" />
          <span>Tap to retry</span>
        </button>
      )}

      {/* Caption overlay — only once loaded */}
      {status === "loaded" && (
        <div className="gallery-overlay">
          <div className="overlay-content">
            <p className="photo-desc">{photo.caption}</p>
            <div className="people-tags">
              <span className="tag">{photo.tag}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ClientCommunityGallery
───────────────────────────────────────────────────────────── */
export default function ClientCommunityGallery({ category }) {
  const photos = category.photos;
  const total  = photos.length;

  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const [heroLoaded,   setHeroLoaded]   = useState(false);

  const heroRef = useRef(null);
  const heroBgRef = useRef(null);

  /* Lightbox state */
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex,  setPhotoIndex]  = useState(0);
  const filmStripRef = useRef(null);

  /* Hero entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* Parallax + mouse parallax */
  useEffect(() => {
    const handleScroll = () => {
      if (!heroBgRef.current) return;
      const scrolled = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) scale(${1 + scrolled * 0.0003})`;
    };
    const handleMouse = (e) => {
      if (!heroBgRef.current || !heroRef.current) return;
      const xOff = (e.clientX / window.innerWidth - 0.5);
      const yOff = (e.clientY / window.innerHeight - 0.5);
      const s = window.scrollY;
      heroBgRef.current.style.transform = `translate3d(${xOff * -25}px, ${yOff * -25 + s * 0.3}px, 0) scale(1.04)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    heroRef.current?.addEventListener("mousemove", handleMouse);
    const hero = heroRef.current;
    return () => {
      window.removeEventListener("scroll", handleScroll);
      hero?.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  /* Reset on category change */
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
    setActivePhoto(null);
  }, [category.id]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (activePhoto === null) return;
    const handler = (e) => {
      if (e.key === "Escape")        closeLightbox();
      else if (e.key === "ArrowRight") nav(1);
      else if (e.key === "ArrowLeft")  nav(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhoto, photoIndex]);

  /* Auto-scroll film strip */
  useEffect(() => {
    if (!filmStripRef.current || activePhoto === null) return;
    const thumb = filmStripRef.current.children[photoIndex];
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [photoIndex, activePhoto]);

  const openLightbox = useCallback((photo, index) => {
    setActivePhoto(photo);
    setPhotoIndex(index);
  }, []);

  const closeLightbox = () => setActivePhoto(null);

  const nav = (dir) => {
    const newIdx = (photoIndex + dir + total) % total;
    setPhotoIndex(newIdx);
    setActivePhoto(photos[newIdx]);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + MORE_BATCH, total));
  };

  const hasMore = visibleCount < total;
  const visiblePhotos = photos.slice(0, visibleCount);

  return (
    <>
      {/* ═══ Hero banner ═══ */}
      <div className="gallery-hero" ref={heroRef}>
        <div
          ref={heroBgRef}
          className="gallery-hero-bg"
          style={{
            backgroundImage: `url(${category.coverImage})`,
            transform: heroLoaded ? undefined : "scale(1.06)",
            transition: heroLoaded ? "none" : "transform 0.8s ease-out",
          }}
        />
        <div className="gallery-hero-content">
          <nav className="gallery-hero-breadcrumb" aria-label="Breadcrumb">
            <Link href="/about">About</Link>
            <i className="fa-solid fa-chevron-right" />
            <Link href="/about#community">Community</Link>
            <i className="fa-solid fa-chevron-right" />
            <span>{category.title}</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="gallery-category-icon">
              <i className={category.icon} />
            </span>
            <h1 className="gallery-hero-title">{category.title}</h1>
          </div>
          <p className="gallery-hero-desc">{category.description}</p>
          <div className="gallery-hero-stats">
            <span className="stat-pill">
              <i className="fa-solid fa-images" />
              {total.toLocaleString()} Photos
            </span>
            <span className="stat-pill">
              <i className="fa-solid fa-calendar" />
              {category.title}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Gallery body ═══ */}
      <div className="community-page">

        {/* Top bar */}
        <div className="gallery-top-bar">
          <p className="gallery-count-text">
            Showing {visibleCount.toLocaleString()} of {total.toLocaleString()} photos
          </p>
          <Link href="/about#community" className="gallery-back-link">
            <i className="fa-solid fa-arrow-left" />
            All Communities
          </Link>
        </div>

        {/* ─── Masonry grid ─── */}
        <div className="masonry-gallery">
          {visiblePhotos.map((photo, index) => (
            <MasonryImage
              key={`${category.id}-${index}`}
              photo={photo}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* ─── Load More button ─── */}
        {hasMore && (
          <div className="gallery-load-more-wrap">
            <button className="gallery-load-more-btn" onClick={loadMore}>
              <i className="fa-solid fa-plus" />
              See More ({(total - visibleCount).toLocaleString()} remaining)
            </button>
          </div>
        )}

        {/* ─── All loaded message ─── */}
        {!hasMore && total > INITIAL_BATCH && (
          <p className="gallery-all-loaded">
            <i className="fa-solid fa-circle-check" /> All {total.toLocaleString()} photos shown
          </p>
        )}

        {/* ─── Back button ─── */}
        <div className="gallery-back-wrap">
          <Link href="/about#community">
            <button className="gradient-button gallery-back-btn">
              <i className="fa-solid fa-arrow-left" />
              Back to Communities
            </button>
          </Link>
        </div>
      </div>

      {/* ═══ Fullscreen Lightbox ═══ */}
      {activePhoto && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          {/* Top bar */}
          <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="lightbox-category">{category.title}</p>
              <p className="lightbox-counter">{photoIndex + 1} / {total.toLocaleString()}</p>
            </div>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Prev */}
          <button
            className="lightbox-nav prev"
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
            aria-label="Previous photo"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          {/* Main image */}
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <p className="lightbox-caption-text">{activePhoto.caption}</p>
              <span className="lightbox-tag">{activePhoto.tag}</span>
            </div>
          </div>

          {/* Next */}
          <button
            className="lightbox-nav next"
            onClick={(e) => { e.stopPropagation(); nav(1); }}
            aria-label="Next photo"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>

          {/* Film strip */}
          <div
            className="lightbox-film-strip"
            ref={filmStripRef}
            onClick={(e) => e.stopPropagation()}
          >
            {photos.slice(Math.max(0, photoIndex - 6), photoIndex + 10).map((photo, i) => {
              const ri = Math.max(0, photoIndex - 6) + i;
              return (
                <img
                  key={ri}
                  src={photo.url}
                  alt=""
                  className={`film-thumb ${ri === photoIndex ? "active" : ""}`}
                  onClick={() => { setPhotoIndex(ri); setActivePhoto(photos[ri]); }}
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
