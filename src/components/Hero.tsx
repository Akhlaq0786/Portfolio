"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

/**
 * True on touch-first devices (phones/tablets), including when the browser
 * is in "Desktop site" mode. Used to lighten expensive effects on phones
 * and to switch off mouse-only effects such as tilt.
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
 * Shared tilt behaviour (spring-smoothed mouse tilt),
 * identical to the one used in the other sections.
 */
function useTilt(disabled: boolean, strength: number) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * strength);
    rotateY.set((x - 0.5) * strength);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const style = disabled
    ? undefined
    : {
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 900,
      };

  return { onMouseMove, reset, style };
}

/**
 * Decorative layers (corner glow + bottom sweep line), identical to the
 * other sections. Everything is positioned with inline styles inside ONE
 * clipped, absolutely-positioned wrapper, so it can never add height.
 */
function CardDecor({
  glowClass,
  corner = 160,
  blur = 60,
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

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();
  const tilt = useTilt(shouldReduceMotion || isTouch, 6);

  const entrance = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          variants: fadeUp,
          initial: "initial",
          animate: "animate",
          transition: { duration: 0.5, delay },
        };

  // Variant label used by the buttons (never "hover", so it can't be mistaken for a CSS class)
  const lift = shouldReduceMotion ? "rest" : "lift";

  return (
    <section
      id="home"
      className="relative isolate mt-10 overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pb-20"
    >
      {/* Background glow (one out-of-flow wrapper, so it can't add spacing) */}
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
            top: "20%",
            width: 320,
            height: 320,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-cyan-500/[0.10]"
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "10%",
            width: 320,
            height: 320,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-purple-500/[0.10]"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="min-w-0"
        >
          <motion.p
            {...entrance(0.05)}
            className="mb-3 text-base font-medium text-gray-300 sm:text-lg"
          >
            Hi, I&apos;m <span className="text-white">Eklakh Ansari</span>
          </motion.p>

          <motion.p
            {...entrance(0.15)}
            className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400 sm:text-sm sm:tracking-[0.3em]"
          >
            MCA • Building Digital Experiences
          </motion.p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
            Building practical solutions with{" "}
            <motion.span
              // The pulsing glow repaints constantly, so it stays off on phones
              animate={
                shouldReduceMotion || isTouch
                  ? {}
                  : {
                      textShadow: [
                        "0 0 20px rgba(129,140,248,0.25)",
                        "0 0 35px rgba(34,211,238,0.35)",
                        "0 0 20px rgba(129,140,248,0.25)",
                      ],
                    }
              }
              transition={{
                duration: 4,
                repeat: shouldReduceMotion || isTouch ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="gradient-text inline-block"
            >
              technology.
            </motion.span>
          </h1>

          <motion.h2
            {...entrance(0.25)}
            className="mt-4 text-xl font-semibold leading-snug text-gray-300 sm:text-2xl lg:text-3xl"
          >
            Quality, purpose, and continuous improvement.
          </motion.h2>

          <motion.p
            {...entrance(0.35)}
            className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:mt-6 sm:text-base lg:text-lg"
          >
            I&apos;m currently pursuing my MCA at Thakur Institute of
            Management Studies, Career Development and Research, with a
            strong interest in building practical and reliable solutions.
            I enjoy solving problems, learning through hands-on work, and
            approaching challenges with attention to detail, quality, and
            a structured mindset.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            {...entrance(0.45)}
            className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
          >
            {/* Primary: light sweeps left to right on hover (same as Contact) */}
            <motion.div
              initial="rest"
              animate="rest"
              whileHover={lift}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              variants={{
                rest: { y: 0, scale: 1 },
                lift: { y: -3, scale: 1.02 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-flex"
            >
              <Link
                href="#projects"
                className="button-hover relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18] sm:px-6 sm:text-base"
              >
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { x: "-130%" },
                    lift: { x: "330%" },
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                <span className="relative">View Projects</span>
              </Link>
            </motion.div>

            {/* Secondary: a plain link, since this downloads a file rather than opening a page */}
            <motion.a
              href="/resume.pdf"
              download="Eklakh_Ansari_Resume.pdf"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`button-hover inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white outline-none transition-colors duration-200 [@media(hover:hover)]:hover:border-purple-300/30 [@media(hover:hover)]:hover:bg-purple-300/[0.07] focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18] sm:px-6 sm:text-base ${
                isTouch ? "" : "backdrop-blur-md"
              }`}
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-7 flex flex-wrap gap-6 text-sm text-gray-400 sm:mt-8"
          >
            <a
              href="https://github.com/Akhlaq0786"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-1 outline-none transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 after:transition-transform after:duration-500 [@media(hover:hover)]:hover:text-cyan-400 [@media(hover:hover)]:hover:after:scale-x-100 focus-visible:text-cyan-400 focus-visible:after:scale-x-100"
            >
              GitHub{" "}
              <span className="inline-block transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/eklakh-ansari-21374b425"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative py-1 outline-none transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-400 after:transition-transform after:duration-500 [@media(hover:hover)]:hover:text-cyan-400 [@media(hover:hover)]:hover:after:scale-x-100 focus-visible:text-cyan-400 focus-visible:after:scale-x-100"
            >
              LinkedIn{" "}
              <span className="inline-block transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Developer card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex min-w-0 justify-center"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -9, 0] }}
            transition={{
              duration: 3.5,
              repeat: shouldReduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-64 sm:max-w-72 lg:max-w-80"
          >
            {/* Animated glow behind the card */}
            <motion.div
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      opacity: [0.25, 0.65, 0.25],
                      scale: [0.96, 1.04, 0.96],
                    }
              }
              transition={{
                duration: 2.8,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className={`absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/10 to-purple-500/30 ${
                isTouch ? "blur-lg" : "blur-xl"
              }`}
            />

            {/* Card shell: tilts with the mouse on desktop */}
            <motion.div
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.reset}
              style={tilt.style}
              className="glass glow group relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-cyan-300/20 p-4 sm:p-6 lg:p-8"
            >
              <CardDecor glowClass="bg-cyan-400/15" touch={isTouch} />

              {/* Slow moving light sweep */}
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-150%", rotate: 18 }}
                  animate={{ x: ["-150%", "250%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 0.7,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                />
              )}

              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 h-12 w-12 rounded-full border border-cyan-400/30 bg-cyan-400/10 blur-sm sm:-right-4 sm:-top-4 sm:h-16 sm:w-16"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 h-14 w-14 rounded-full border border-purple-400/30 bg-purple-400/10 blur-sm sm:-bottom-5 sm:-left-5 sm:h-20 sm:w-20"
              />

              {/* Card content */}
              <div className="relative z-10 text-center">
                <motion.div
                  animate={shouldReduceMotion ? {} : { scale: [1, 1.07, 1] }}
                  transition={{
                    duration: 2,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-3 text-6xl font-bold text-cyan-400 sm:mb-5 sm:text-7xl"
                  aria-hidden="true"
                >
                  &lt;/&gt;
                </motion.div>

                <p className="text-lg font-semibold text-white sm:text-xl">
                  Developer
                </p>

                <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                  Code • Learn • Build
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 sm:mt-6 sm:text-xs">
                  <motion.span
                    aria-hidden="true"
                    animate={
                      shouldReduceMotion ? {} : { opacity: [1, 0.45, 1] }
                    }
                    transition={{
                      duration: 1.3,
                      repeat: shouldReduceMotion ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-2 w-2 shrink-0 rounded-full bg-green-400"
                  />
                  <span>Currently learning &amp; building</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}