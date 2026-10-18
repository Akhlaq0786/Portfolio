"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution:
      "Thakur Institute of Management Studies, Career Development and Research",
    period: "2026 – 2028",
    description:
      "Currently pursuing a postgraduate degree focused on computer applications, software development, advanced technical concepts, and practical problem-solving.",
    current: true,
    icon: "MCA",
    tags: [
      "Computer Applications",
      "Software Development",
      "Advanced Computing",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Model College",
    period: "2022 – 2025",
    description:
      "Completed a bachelor's degree in Computer Science with a foundation in programming, databases, web technologies, algorithms, and software development.",
    current: false,
    icon: "BSc",
    tags: ["Computer Science", "Programming", "Web Technologies"],
  },
  {
    degree: "Higher Secondary Certificate (HSC) – Science",
    institution: "Model College",
    period: "2022",
    description:
      "Completed higher secondary education in the Science stream, building a strong foundation in mathematics, science, and computer-related concepts.",
    current: false,
    icon: "HSC",
    tags: ["Science", "Mathematics", "Computer Fundamentals"],
  },
];

type EducationItemData = (typeof education)[number];

/**
 * True on touch-first devices (phones/tablets), including when the browser
 * is in "Desktop site" mode. Used to switch off mouse-only effects such as
 * tilt and hover, and to show touch hints regardless of viewport width.
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
 * Decorative layers (gradient wash, corner glow, bottom sweep line).
 * Everything is positioned with inline styles inside ONE clipped,
 * absolutely-positioned wrapper, so these layers can never add height
 * to the card or be changed by global CSS rules.
 */
function CardDecor({
  active,
  glowClass,
  subtle = true,
  wash = true,
  corner = 192,
  blur = 75,
  touch = false,
}: {
  active: boolean;
  glowClass: string;
  subtle?: boolean;
  wash?: boolean;
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
      {wash && (
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
      )}

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
          active
            ? "opacity-100"
            : subtle
            ? "opacity-40 [@media(hover:hover)]:group-hover:opacity-100"
            : "opacity-0 [@media(hover:hover)]:group-hover:opacity-100"
        }`}
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
        className={`bg-gradient-to-r from-cyan-400 to-purple-400 transition-transform duration-500 ${
          active ? "scale-x-100" : "scale-x-0 [@media(hover:hover)]:group-hover:scale-x-100"
        }`}
      />
    </div>
  );
}

/**
 * One timeline row (milestone + card).
 * Uses the same interaction model as the About cards:
 * - fade-up entrance with stagger
 * - mouse tilt (±7°) with spring smoothing
 * - hover lift + slight scale, tap press-down
 * - tap/click toggles an "active" glow state
 * - milestone badge springs (rotate + scale) when active
 */
function EducationTimelineItem({
  item,
  index,
  reduceMotion,
}: {
  item: EducationItemData;
  index: number;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 22,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 22,
  });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || isTouch) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - y) * 7);
    rotateY.set((x - 0.5) * 7);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  function handleTap() {
    setActive((previous) => !previous);

    if (reduceMotion || isTouch) return;

    rotateX.set(-2);
    rotateY.set(2);

    window.setTimeout(() => {
      resetTilt();
    }, 250);
  }

  const activeStyles = item.current
    ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
    : "border-purple-300/40 bg-purple-400/[0.05] shadow-[0_0_28px_rgba(168,85,247,0.12)]";

  const idleStyles = item.current
    ? "border-cyan-300/25 bg-[#0b1423]/80 [@media(hover:hover)]:hover:border-cyan-400/40 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(34,211,238,0.10)]"
    : "border-white/[0.12] bg-[#0b0e1b]/75 [@media(hover:hover)]:hover:border-purple-300/35 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(168,85,247,0.10)]";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
      className="relative pl-12 sm:pl-14"
    >
      {/* Timeline milestone */}
      <motion.div
        initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 0.4,
          delay: reduceMotion ? 0 : index * 0.12 + 0.15,
        }}
        className="absolute left-0 top-7 z-[2] sm:left-[3px]"
      >
        {/* Inner wrapper handles the active spring so it never fights the entrance */}
        <motion.div
          animate={
            active && !reduceMotion
              ? { rotate: -8, scale: 1.08 }
              : { rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#080c18] sm:h-11 sm:w-11 ${
            item.current
              ? "border-cyan-300/60 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
              : active
              ? "border-purple-300/50"
              : "border-white/15"
          }`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[9px] font-bold sm:h-8 sm:w-8 ${
              item.current
                ? "bg-gradient-to-br from-cyan-300/20 to-purple-400/20 text-cyan-200"
                : "bg-white/[0.05] text-gray-400"
            }`}
          >
            {item.icon}
          </span>
        </motion.div>
      </motion.div>

      {/* Interactive card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          resetTilt();
          setActive(false);
        }}
        onTap={handleTap}
        whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 900,
              }
        }
        className={`card-hover group relative isolate overflow-hidden rounded-2xl border ${
          isTouch ? "" : "backdrop-blur-2xl"
        } transition-[border-color,box-shadow,background-color] duration-300 ${
          active ? activeStyles : idleStyles
        }`}
      >
        <CardDecor
          active={active}
          glowClass={item.current ? "bg-cyan-400/15" : "bg-purple-500/10"}
          touch={isTouch}
        />

        <div className="relative z-[1] p-5 sm:p-7">
          {/* Institution and status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300 sm:text-sm">
              {item.institution}
            </span>

            {item.current && (
              <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.07] px-3 py-1 text-[11px] font-medium text-green-300">
                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-green-400"
                />
                Currently Pursuing
              </span>
            )}
          </div>

          {/* Degree and dates */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="max-w-2xl text-lg font-semibold leading-snug text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-100 sm:text-xl lg:text-2xl">
              {item.degree}
            </h3>

            <span
              className={`w-fit shrink-0 rounded-lg border px-3 py-1.5 font-mono text-xs ${
                item.current
                  ? "border-cyan-300/25 bg-cyan-300/[0.07] text-cyan-200"
                  : "border-white/10 bg-white/[0.035] text-gray-400"
              }`}
            >
              {item.period}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-[15px]">
            {item.description}
          </p>

          {/* Subject tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                whileHover={
                  reduceMotion ? undefined : { y: -4, scale: 1.015 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className={`rounded-lg border px-3 py-1.5 text-[11px] transition-colors duration-200 sm:text-xs ${
                  item.current
                    ? "border-cyan-300/15 bg-cyan-300/[0.045] text-cyan-100/80 [@media(hover:hover)]:hover:border-cyan-300/35"
                    : tagIndex === 0
                    ? "border-purple-300/15 bg-purple-300/[0.04] text-purple-100/80 [@media(hover:hover)]:hover:border-purple-300/30"
                    : "border-white/[0.08] bg-white/[0.025] text-gray-400 [@media(hover:hover)]:hover:border-white/20 [@media(hover:hover)]:hover:text-gray-200"
                }`}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
            <span className="text-[11px] text-gray-500">
              {item.current
                ? "Currently expanding my knowledge"
                : "Academic milestone"}
            </span>

            <span
              className={`font-mono text-xs ${
                item.current ? "text-cyan-300" : "text-gray-600"
              }`}
            >
              0{index + 1}
            </span>
          </div>

          {isTouch && (
          <p className="mt-4 text-xs font-medium text-cyan-400/70">
            Tap card to interact
          </p>
        )}
        </div>

      </motion.div>
    </motion.article>
  );
}

export default function Education() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="education"
      className="relative isolate overflow-hidden px-5 py-16 sm:py-24 sm:px-8"
    >
      {/* Ambient cyan and purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[70px] md:blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/[0.07] blur-[70px] md:blur-[110px]"
      />

      <div className="relative mx-auto max-w-5xl">
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
            Education & Learning
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            My Academic <span className="gradient-text">Journey</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Building a strong foundation in computer science while
            continuing to grow through advanced learning and practical
            problem-solving.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-cyan-300/70 via-purple-400/40 to-transparent sm:left-[23px]"
          />

          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              ease: "easeOut",
            }}
            className="absolute bottom-8 left-[19px] top-8 w-px origin-top bg-gradient-to-b from-cyan-300 via-purple-400/50 to-transparent sm:left-[23px]"
          />

          <div className="space-y-7 sm:space-y-9">
            {education.map((item, index) => (
              <EducationTimelineItem
                key={item.degree}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Closing note */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.15 }}
          className="mt-10 flex items-center justify-center gap-3 text-center"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-purple-400/50" />
          <p className="text-xs text-gray-500 sm:text-sm">
            Learning is a continuous journey.
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400/50" />
        </motion.div>
      </div>
    </section>
  );
}