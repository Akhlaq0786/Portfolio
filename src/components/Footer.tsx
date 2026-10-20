"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Akhlaq0786", external: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/eklakh-ansari-21374b425",
    external: true,
  },
  { name: "Email", href: "mailto:eklakhansari389@gmail.com", external: false },
];

/**
 * True on touch-first devices (phones/tablets), including when the browser
 * is in "Desktop site" mode. Used to lighten blur effects on touch devices.
 */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isTouch;
}

/**
 * Decorative layers (corner glow + bottom sweep line), identical to the
 * other sections. Everything is positioned with inline styles inside ONE
 * clipped, absolutely-positioned wrapper, so it can never add height.
 */
function CardDecor({
  glowClass,
  corner = 112,
  blur = 50,
  touch = false,
}: {
  glowClass: string;
  corner?: number;
  blur?: number;
  touch?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: "hidden",
        pointerEvents: "none",
        borderRadius: "inherit",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -corner * 0.42,
          right: -corner * 0.42,
          width: corner,
          height: corner,
          borderRadius: "9999px",
          filter: `blur(${touch ? Math.round(blur * 0.55) : blur}px)`,
        }}
        className={`${glowClass} opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100`}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 1,
          transformOrigin: "left",
        }}
        className="scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-400 transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-x-100"
      />
    </div>
  );
}

/**
 * Floating back-to-top button.
 * - fades in/out properly (AnimatePresence)
 * - ring shows how far down the page you are
 * - respects phone safe areas (notch / home bar)
 */
function BackToTop({ reduceMotion }: { reduceMotion: boolean }) {
  const [visible, setVisible] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 500);
  });

  // Handle a page that is reloaded while already scrolled down
  useEffect(() => {
    setVisible(window.scrollY > 500);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          className="fixed right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-[#080c18]/90 text-cyan-400 shadow-lg outline-none transition-colors [@media(hover:hover)]:hover:border-cyan-400/40 [@media(hover:hover)]:hover:bg-cyan-400/10 focus-visible:ring-2 focus-visible:ring-cyan-300 sm:right-6"
        >
          {/* Scroll progress ring */}
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            fill="none"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? scrollYProgress : smoothProgress }}
            />
          </svg>

          <span aria-hidden="true" className="relative text-base">
            ↑
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative isolate overflow-hidden px-5 pb-8 pt-14 sm:px-8 sm:pt-16">
        {/* Ambient background glow + top edge line (one out-of-flow wrapper, so it can't add spacing) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: 0,
              width: 256,
              height: 256,
              borderRadius: "9999px",
              filter: `blur(${isTouch ? 70 : 110}px)`,
            }}
            className="bg-cyan-500/[0.05]"
          />
          <div
            style={{
              position: "absolute",
              right: "10%",
              bottom: 0,
              width: 256,
              height: 256,
              borderRadius: "9999px",
              filter: `blur(${isTouch ? 70 : 110}px)`,
            }}
            className="bg-purple-500/[0.06]"
          />

          {/* Top edge: draws itself in when the footer scrolls into view */}
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 1,
              transformOrigin: "left",
            }}
            className="bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Main Footer */}
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            {/* Brand */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.55 }}
            >
              <a
                href="#home"
                className="group inline-flex items-center text-2xl font-bold tracking-wide text-white transition-colors duration-300 [@media(hover:hover)]:hover:text-cyan-100"
              >
                Eklakh
              </a>

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                Computer Science graduate and MCA student passionate about
                software development, quality assurance, and building
                meaningful technology.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="button-hover inline-flex min-h-10 items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 outline-none transition-colors [@media(hover:hover)]:hover:border-cyan-400/30 [@media(hover:hover)]:hover:text-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                  >
                    {link.name} ↗
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              aria-label="Footer"
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.12,
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Navigation
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="group relative w-fit py-1 text-sm text-gray-500 outline-none transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 after:transition-transform after:duration-500 [@media(hover:hover)]:hover:text-cyan-400 [@media(hover:hover)]:hover:after:scale-x-100 focus-visible:text-cyan-400 focus-visible:after:scale-x-100"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.nav>

            {/* Currently */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.24,
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Currently
              </h3>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group relative isolate mt-5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-[border-color,background-color] duration-300 [@media(hover:hover)]:hover:border-cyan-400/25 [@media(hover:hover)]:hover:bg-cyan-400/[0.04]"
              >
                <CardDecor glowClass="bg-cyan-400/15" touch={isTouch} />

                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion ? undefined : { opacity: [1, 0.4, 1] }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-2 w-2 shrink-0 rounded-full bg-green-400"
                    />

                    <span className="text-sm text-gray-300">
                      Learning &amp; Building
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-500">
                    Pursuing MCA and continuously developing my skills
                    through projects and hands-on learning.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Divider: draws itself in */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: "easeOut" }}
            className="my-10 h-px origin-center bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Bottom */}
          <div className="flex flex-col gap-3 text-center text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>
              © {currentYear} Eklakh Abdulkhalik Ansari. All rights reserved.
            </p>

            <p className="text-gray-500">
              Code <span className="text-cyan-400">•</span> Learn{" "}
              <span className="text-cyan-400">•</span> Build{" "}
              <span className="text-cyan-400">•</span> Grow
            </p>
          </div>
        </div>
      </footer>

      <BackToTop reduceMotion={reduceMotion} />
    </>
  );
}