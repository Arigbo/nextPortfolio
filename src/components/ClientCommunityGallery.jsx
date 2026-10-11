"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

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
      {isPending && (
        <div className="masonry-skeleton" aria-hidden="true">
          {status === "retrying" && (
            <span className="retry-text mono">retrying in {countdown}s…</span>
          )}
        </div>
      )}

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

      {status === "failed" && (
        <button className="masonry-failed mono" onClick={manualRetry} aria-label="Retry loading image">
          <i className="fa-solid fa-rotate-right" />
          <span>load failed — retry</span>
        </button>
      )}

      {status === "loaded" && (
        <div className="masonry-caption">
          <span className="tag">{photo.tag}</span>
          <p>{photo.caption}</p>
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
  const [activePhoto, setActivePhoto] = useState(null);
  const [photoIndex,  setPhotoIndex]  = useState(0);
  const filmStripRef = useRef(null);

  /* Reset on category change */
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
    setActivePhoto(null);
  }, [category.id]);

  /* Keyboard navigation + scroll lock for lightbox */
  useEffect(() => {
    if (activePhoto === null) return;
    const handler = (e) => {
      if (e.key === "Escape")          closeLightbox();
      else if (e.key === "ArrowRight") nav(1);
      else if (e.key === "ArrowLeft")  nav(-1);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhoto, photoIndex]);

  /* Keep the active film-strip thumb centred */
  useEffect(() => {
    if (!filmStripRef.current || activePhoto === null) return;
    const thumb = filmStripRef.current.querySelector(".film-thumb.active");
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

  const loadMore = () => setVisibleCount((prev) => Math.min(prev + MORE_BATCH, total));

  const hasMore = visibleCount < total;
  const visiblePhotos = photos.slice(0, visibleCount);
  const stripStart = Math.max(0, photoIndex - 6);

  return (
    <div className="page container gallery">
      {/* ═══ Header ═══ */}
      <Reveal className="cmd-head">
        <div>
          <nav className="crumbs mono" aria-label="Breadcrumb">
            <span className="tk-prompt">❯</span>
            <span className="dim">cd</span>
            <Link href="/about">~/about</Link>/<Link href="/about#community">community</Link>/<span className="bright">{category.id}</span>
          </nav>
          <h1><i className={`${category.icon} gallery-icon`} aria-hidden="true" /> {category.title}</h1>
          <p className="cmd-sub">{category.description}</p>
        </div>
        <p className="mono gallery-total">
          <span className="dim">total</span> <span className="bright">{total.toLocaleString()}</span>
        </p>
      </Reveal>

      <div className="gallery-bar mono">
        <span className="tk-com"># showing {visibleCount.toLocaleString()} of {total.toLocaleString()} photos</span>
        <Link href="/about#community" className="text-link">
          <i className="fa-solid fa-arrow-left" /> cd ..
        </Link>
      </div>

      {/* ═══ Masonry grid ═══ */}
      <div className="masonry">
        {visiblePhotos.map((photo, index) => (
          <MasonryImage
            key={`${category.id}-${index}`}
            photo={photo}
            index={index}
            onOpen={openLightbox}
          />
        ))}
      </div>

      {hasMore ? (
        <div className="gallery-more">
          <button className="btn" onClick={loadMore}>
            <i className="fa-solid fa-plus" /> load more <span className="dim">({(total - visibleCount).toLocaleString()} remaining)</span>
          </button>
        </div>
      ) : (
        total > INITIAL_BATCH && (
          <p className="gallery-done mono">
            <span className="accent">✓</span> all {total.toLocaleString()} photos loaded
          </p>
        )
      )}

      {/* ═══ Lightbox ═══ */}
      {activePhoto && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <div className="lightbox-top mono" onClick={(e) => e.stopPropagation()}>
            <span>
              <span className="bright">{category.id}/</span>
              <span className="dim"> {photoIndex + 1} / {total.toLocaleString()}</span>
            </span>
            <button className="icon-btn" onClick={closeLightbox} aria-label="Close viewer">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <button
            className="lightbox-nav prev icon-btn"
            onClick={(e) => { e.stopPropagation(); nav(-1); }}
            aria-label="Previous photo"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <figure className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto.url} alt={activePhoto.caption} className="lightbox-img" />
            <figcaption className="lightbox-caption">
              <span className="tag">{activePhoto.tag}</span>
              <p>{activePhoto.caption}</p>
            </figcaption>
          </figure>

          <button
            className="lightbox-nav next icon-btn"
            onClick={(e) => { e.stopPropagation(); nav(1); }}
            aria-label="Next photo"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>

          <div className="film-strip" ref={filmStripRef} onClick={(e) => e.stopPropagation()}>
            {photos.slice(stripStart, photoIndex + 10).map((photo, i) => {
              const ri = stripStart + i;
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
    </div>
  );
}
