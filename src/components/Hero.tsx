"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative mt-10 overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pb-20"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="glow-orb left-[10%] top-[20%]"
      />
      <div
        aria-hidden="true"
        className="glow-orb bottom-[10%] right-[5%]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="min-w-0"
        >
          <motion.p
            {...(shouldReduceMotion
              ? {}
              : {
                variants: fadeUp,
                initial: "initial",
                animate: "animate",
                transition: { duration: 0.5, delay: 0.15 },
              })}
            className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-cyan-400 sm:text-sm sm:tracking-[0.3em]"
          >
            MCA • Building Digital Experiences
          </motion.p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
            Building practical solutions with{" "}
            <motion.span
              animate={
                shouldReduceMotion
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
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="gradient-text inline-block"
            >
              technology.
            </motion.span>
          </h1>

          <motion.h2
            {...(shouldReduceMotion
              ? {}
              : {
                variants: fadeUp,
                initial: "initial",
                animate: "animate",
                transition: { duration: 0.5, delay: 0.25 },
              })}
            className="mt-4 text-xl font-semibold leading-snug text-gray-300 sm:text-2xl lg:text-3xl"
          >
            Quality, purpose, and continuous improvement.
          </motion.h2>

          <motion.p
            {...(shouldReduceMotion
              ? {}
              : {
                variants: fadeUp,
                initial: "initial",
                animate: "animate",
                transition: { duration: 0.5, delay: 0.35 },
              })}
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
            {...(shouldReduceMotion
              ? {}
              : {
                variants: fadeUp,
                initial: "initial",
                animate: "animate",
                transition: { duration: 0.5, delay: 0.45 },
              })}
            className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4"
          >
            <Link
              href="#projects"
              className="button-hover inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black sm:px-6 sm:text-base"
            >
              View Projects
            </Link>

            <Link
              href="/resume.pdf"
              download="Eklakh_Ansari_Resume.pdf"
              className="button-hover inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md sm:px-6 sm:text-base"
            >
              Download Resume
            </Link>
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
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/eklakh-ansari-21374b425"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-cyan-400"
            >
              LinkedIn ↗
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
              className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/10 to-purple-500/30 blur-xl"
            />

            {/* Card shell */}
            <div className="glass glow relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-cyan-300/20 p-4 sm:p-6 lg:p-8">
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

                <motion.p
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                  }
                  transition={{
                    duration: 6,
                    repeat: shouldReduceMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ backgroundSize: "200% auto" }}
                  className="gradient-text inline-block text-xl font-bold tracking-tight sm:text-2xl"
                >
                  Eklakh Ansari
                </motion.p>

                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300/80 sm:text-sm">
                  Developer
                </p>
                <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                  Code • Learn • Build
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 sm:mt-6 sm:text-xs">
                  <motion.span
                    aria-hidden="true"
                    animate={shouldReduceMotion ? {} : { opacity: [1, 0.45, 1] }}
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
