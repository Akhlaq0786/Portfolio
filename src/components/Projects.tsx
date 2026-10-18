"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const projects = [
  {
    number: "01",
    title: "VisualizeX",
    category: "Algorithm Visualizer & Online IDE",
    description:
      "An interactive learning platform that brings algorithms to life through step-by-step visualizations, alongside an integrated coding environment for writing and executing code.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "D3.js",
      "Python",
      "Monaco Editor",
    ],
    github: "https://github.com/Akhlaq0786/VisualizeX.git",
    demo: "https://visualize-x.vercel.app",
  },
];

const algorithms = [
  "bubbleSort",
  "quickSort",
  "mergeSort",
  "insertionSort",
  "selectionSort",
];

/**
 * True on touch-first devices (phones/tablets), including when the browser
 * is in "Desktop site" mode. Used to switch off mouse-only effects such as
 * tilt and hover, and to enable touch-only effects.
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
 * Shared tilt behaviour (spring-smoothed mouse tilt + tap nudge),
 * identical to the one used in About, Education and Skills.
 */
function useTilt(reduceMotion: boolean, strength: number) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function onMouseMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;

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

  function nudge() {
    if (reduceMotion) return;

    rotateX.set(-1);
    rotateY.set(1);

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(reset, 250);
  }

  const style = reduceMotion
    ? undefined
    : {
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1200,
      };

  return { onMouseMove, reset, nudge, style };
}

/**
 * Decorative layers (gradient wash, corner glow, bottom sweep line).
 * Everything is positioned with inline styles inside ONE clipped,
 * absolutely-positioned wrapper, so these layers can never add height
 * to the card or be changed by global CSS rules.
 */
function CardDecor({
  active,
  glowClass,
  touch = false,
  corner = 192,
  blur = 75,
}: {
  active: boolean;
  glowClass: string;
  touch?: boolean;
  corner?: number;
  blur?: number;
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
      {/* Cyan-to-purple wash: visible on touch, hover/tap enhanced */}
      <div
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
        className={`bg-gradient-to-br from-cyan-400/[0.07] via-transparent to-purple-500/[0.07] transition-opacity duration-300 ${
          active
            ? "opacity-100"
            : touch
            ? "opacity-70"
            : "opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        }`}
      />

      {/* Ambient corner light */}
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
        className={`${glowClass} transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-40 [@media(hover:hover)]:group-hover:opacity-100"
        }`}
      />

      {/* Bottom line sweeps in on hover / tap */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 1,
          transformOrigin: "left",
        }}
        className={`bg-gradient-to-r from-cyan-400 to-purple-400 transition-transform duration-500 ${
          active ? "scale-x-100" : "scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100"
        }`}
      />
    </div>
  );
}

/**
 * One-time light sweep when the card scrolls into view.
 * Only used on touch devices, where there is no hover to trigger the
 * card-hover shine.
 */
function MobileScrollShine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-3xl"
    >
      <motion.div
        initial={{ x: "-120%", opacity: 0 }}
        animate={
          isInView && !reduceMotion
            ? { x: ["-120%", "220%"], opacity: [0, 0.45, 0] }
            : { opacity: 0 }
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.35, 1],
        }}
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/[0.08] to-transparent"
      />
    </div>
  );
}

function CodePreview() {
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();

  // Only cycle while the preview is actually on screen (saves battery on phones)
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });

  useEffect(() => {
    if (reduceMotion || !inView) return;

    const interval = window.setInterval(() => {
      setAlgorithmIndex((previous) => (previous + 1) % algorithms.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [reduceMotion, inView]);

  const currentAlgorithm = algorithms[algorithmIndex];

  return (
    <motion.div
      ref={rootRef}
      whileHover={reduceMotion ? undefined : { scale: 1.025, y: -2 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-[2] w-full max-w-md"
    >
      {/* Editor window */}
      <div
        className={`overflow-hidden rounded-2xl border border-white/10 bg-[#080c18]/95 shadow-[0_20px_80px_rgba(0,0,0,0.4)] ${
          isTouch ? "" : "backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>

          <span className="font-mono text-[11px] text-gray-500">
            algorithm.ts
          </span>

          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.07] px-2 py-1 text-[10px] text-cyan-300">
            TypeScript
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs text-gray-500">ALGORITHM PLAYGROUND</span>
            <span className="flex items-center gap-1.5 text-[10px] text-green-400">
              <motion.span
                aria-hidden="true"
                animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-green-400"
              />
              Ready
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs leading-6 sm:text-sm">
            <p>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-cyan-300">algorithm</span>{" "}
              <span className="text-gray-400">=</span>{" "}
              <motion.span
                key={currentAlgorithm}
                initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block text-amber-300"
              >
                &quot;{currentAlgorithm}&quot;
              </motion.span>
              <span className="text-gray-400">;</span>
            </p>

            <p className="text-gray-600">{"//"} Explore algorithms visually</p>

            <p>
              <span className="text-purple-400">function</span>{" "}
              <span className="text-blue-300">visualize</span>
              <span className="text-gray-300">()</span>{" "}
              <span className="text-gray-400">{"{"}</span>
            </p>

            <p className="pl-4 text-gray-300">
              <span className="text-purple-400">return</span>{" "}
              <span className="text-cyan-300">animateSteps</span>
              <span className="text-gray-400">(</span>
              <span className="text-yellow-200">algorithm</span>
              <span className="text-gray-400">);</span>
            </p>

            <p className="text-gray-400">{"}"}</p>
          </div>

          {/* Visualization bars */}
          <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">
                Visual representation
              </span>
              <span className="text-[10px] text-cyan-300">Live preview</span>
            </div>

            <div className="flex h-20 items-end justify-center gap-2">
              {[35, 62, 45, 85, 53, 72, 28, 58].map((height, index) => (
                <motion.div
                  key={`${currentAlgorithm}-${index}`}
                  initial={
                    reduceMotion
                      ? false
                      : { height: `${height * 0.45}%`, opacity: 0.5 }
                  }
                  animate={{
                    height: `${height}%`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.045,
                    ease: "easeOut",
                  }}
                  className={`w-full max-w-5 rounded-t-md ${
                    index === algorithmIndex % 8
                      ? "bg-gradient-to-t from-purple-500 to-purple-300"
                      : "bg-gradient-to-t from-cyan-600/70 to-cyan-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
            <span className="text-[11px] text-gray-500">
              Interactive learning experience
            </span>
            <span className="font-mono text-[10px] text-cyan-300">
              {"</>"} VisualizeX
            </span>
          </div>
        </div>
      </div>

      {/* Decorative floating label */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 -top-4 rounded-xl border border-purple-300/20 bg-[#111327]/95 px-3 py-2 shadow-lg sm:-right-4"
      >
        <span className="flex items-center gap-2 text-xs text-purple-200">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          Learn by visualizing
        </span>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: (typeof projects)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();
  // Gentler tilt than the small cards: this one is large
  const tilt = useTilt(reduceMotion || isTouch, 3);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => {
        tilt.reset();
        setActive(false);
      }}
      onTap={(event) => {
        // Taps on the Live Demo / Source Code links should just open the link
        const target = event.target as HTMLElement | null;
        if (target?.closest?.("a")) return;

        setActive((previous) => !previous);
        tilt.nudge();
      }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      style={tilt.style}
      className={`card-hover group relative isolate overflow-hidden rounded-3xl border transition-[border-color,box-shadow,background-color] duration-300 ${
        active
          ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
          : "border-white/10 bg-white/[0.035] shadow-[0_20px_80px_rgba(0,0,0,0.18)] [@media(hover:hover)]:hover:border-cyan-300/25 [@media(hover:hover)]:hover:bg-white/[0.045]"
      }`}
    >
      <CardDecor
        active={active}
        glowClass="bg-cyan-400/15"
        touch={isTouch}
        corner={260}
        blur={90}
      />

      {isTouch && <MobileScrollShine />}

      {/* Top edge glow */}
      <div className="pointer-events-none absolute inset-x-8 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-40 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100" />

      <div className="relative z-[2] grid md:grid-cols-[0.95fr_1.25fr]">
        {/* Visual preview */}
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#070b16]/60 p-6 sm:min-h-[330px] sm:p-10 md:min-h-[420px] md:border-b-0 md:border-r">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.09) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="pointer-events-none absolute left-8 top-8 h-32 w-32 rounded-full bg-cyan-400/[0.09] opacity-70 blur-3xl transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100" />
          <div className="pointer-events-none absolute bottom-8 right-8 h-32 w-32 rounded-full bg-purple-500/[0.12] blur-3xl" />

          <CodePreview />
        </div>

        {/* Project details */}
        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-9 lg:p-11">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-sm tracking-widest text-cyan-300">
              PROJECT / {project.number}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-300/[0.06] px-3 py-1.5 text-xs text-purple-200">
              <motion.span
                aria-hidden="true"
                animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-purple-300"
              />
              Featured Project
            </span>
          </div>

          <h3 className="mt-6 break-words text-3xl font-bold tracking-tight text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-100 sm:text-4xl">
            {project.title}
          </h3>

          <p className="mt-3 text-sm font-medium text-cyan-300 sm:text-base">
            {project.category}
          </p>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            {project.description}
          </p>

          {/* Technology tags */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Built with
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology, techIndex) => (
                <motion.span
                  key={technology}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={
                    reduceMotion ? undefined : { y: -4, scale: 1.015 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    delay: reduceMotion ? 0 : 0.2 + techIndex * 0.045,
                  }}
                  className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-200 sm:text-sm ${
                    techIndex % 2 === 0
                      ? "border-cyan-300/15 bg-cyan-300/[0.045] text-gray-300 [@media(hover:hover)]:hover:border-cyan-300/40 [@media(hover:hover)]:hover:text-cyan-200"
                      : "border-purple-300/15 bg-purple-300/[0.045] text-gray-300 [@media(hover:hover)]:hover:border-purple-300/40 [@media(hover:hover)]:hover:text-purple-200"
                  }`}
                >
                  {technology}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Project actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061018] transition-all duration-200 [@media(hover:hover)]:hover:bg-cyan-200 [@media(hover:hover)]:hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18]"
            >
              Live Demo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M7 17 17 7M8 7h9v9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-200 [@media(hover:hover)]:hover:border-purple-300/30 [@media(hover:hover)]:hover:bg-purple-300/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.29-.5-1.42.11-2.96 0 0 .95-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.54.23 2.67.11 2.96.73.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              Source Code
            </a>
          </div>

          <p className="mt-5 text-xs leading-5 text-gray-500">
            Explore the live experience or view the source on GitHub.
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24"
    >
      {/* Ambient background (one out-of-flow wrapper, so it can't add spacing) */}
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
            left: 0,
            top: "25%",
            width: 288,
            height: 288,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-cyan-500/[0.07]"
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 288,
            height: 288,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-purple-500/[0.07]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading (same entrance as About) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Selected Work
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A look at projects where I turn ideas into interactive
            experiences, explore new technologies, and solve practical
            problems.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Future projects hint */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-2 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
            />
            More projects and experiments are on the way
          </div>
          <p className="text-xs text-gray-600">
            New ideas. New builds. Continuous learning.
          </p>
        </motion.div>
      </div>
    </section>
  );
}