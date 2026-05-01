/*
 * DESIGN PHILOSOPHY: Noir Precision + Generative Art
 * - Deep navy-black background (#060B18)
 * - Near-white text (#F0F4FF) with blue tint
 * - Electric violet-blue accent (#7C6FFF) — extreme restraint
 * - Space Grotesk display (medium weight, not bold), DM Sans body
 * - Full-viewport hero, logo top-left, CTA pill top-right
 * - Headline anchored bottom-left
 * - Flat purple CTA buttons, no calendar icon, no logo glow
 */

import GeometricCanvas from "@/components/GeometricCanvas";
import { useEffect, useState } from "react";

const CAL_LINK = "https://cal.com/minski";
const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663540651656/DWRG6xTnecoqX8ZS9be2gV/logo-mark-v2-Aee3gWaqvrh753D7tQzMut.webp";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "#060B18",
        color: "#F0F4FF",
      }}
    >
      {/* Animated geometric background */}
      <GeometricCanvas />

      {/* Left-side vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 88% at 8% 82%, rgba(6,11,24,0.96) 0%, rgba(6,11,24,0.55) 48%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Navigation ── */}
      <nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between"
        style={{ padding: "22px 40px", zIndex: 10 }}
      >
        {/* Logo — no glow on text or image */}
        <a
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Minski home"
          style={{ textDecoration: "none" }}
        >
          <img
            src={LOGO_URL}
            alt="Minski logo"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "22px",
              letterSpacing: "-0.01em",
              color: "#F0F4FF",
            }}
          >
            Minski
          </span>
        </a>

        {/* Get Started — flat solid purple */}
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 500,
            fontSize: "13.5px",
            color: "#F0F4FF",
            background: "#7C6FFF",
            border: "none",
            borderRadius: "9999px",
            padding: "9px 22px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#6A5EE8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#7C6FFF";
          }}
        >
          Get Started
        </a>
      </nav>

      {/* ── Hero — bottom-left anchored ── */}
      <main
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 40px 72px",
          zIndex: 5,
        }}
      >
        <div style={{ maxWidth: "640px" }}>

          {/* Main headline — medium weight, not bold */}
          <h1
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
              color: "#F0F4FF",
            }}
          >
            <span
              style={{
                display: "block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(26px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              Financial
            </span>
            <span
              style={{
                display: "block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(26px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s",
              }}
            >
              infrastructure
            </span>
            <span
              style={{
                display: "block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(26px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s",
              }}
            >
              for{" "}
              <span style={{ color: "#7C6FFF" }}>
                AI tokens.
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              lineHeight: 1.65,
              color: "rgba(240,244,255,0.52)",
              marginBottom: "36px",
              maxWidth: "360px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s",
            }}
          >
            The first exchange for trading, hedging, and pricing AI tokens.
          </p>

          {/* Schedule a Call — flat solid purple, no icon */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.68s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.68s",
            }}
          >
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#F0F4FF",
                background: "#7C6FFF",
                border: "none",
                borderRadius: "9999px",
                padding: "13px 30px",
                textDecoration: "none",
                transition: "background 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#6A5EE8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#7C6FFF";
              }}
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
