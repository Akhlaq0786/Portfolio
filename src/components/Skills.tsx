"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const skillCategories = [
  {
    title: "Programming & Web",
    icon: "</>",
    tone: "cyan" as const,
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "React.js",
      "Next.js",
    ],
  },
  {
    title: "Database & Tools",
    icon: "⌘",
    tone: "purple" as const,
    skills: [
      "MySQL",
      "PostgreSQL",
      "Git",
      "GitHub",
      "VS Code",
      "Monaco Editor",
    ],
  },
  {
    title: "QA & Testing",
    icon: "✓",
    tone: "purple" as const,
    skills: [
      "Software Testing",
      "Test Cases",
      "Bug Tracking",
      "Debugging",
      "Quality Assurance",
    ],
  },
  {
    title: "Professional Skills",
    icon: "✦",
    tone: "cyan" as const,
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Project Coordination",
      "Program Management",
    ],
  },
];

type SkillCategory = (typeof skillCategories)[number];

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
 * Shared tilt behaviour (spring-smoothed mouse tilt + tap nudge),
 * identical to the one used in About and Education.
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

    rotateX.set(-2);
    rotateY.set(2);

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(reset, 250);
  }

  const style = reduceMotion
    ? undefined
    : {
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 900,
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
}: {
  active: boolean;
  glowClass: string;
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
      {/* Cyan-to-purple wash: visible on mobile, hover/tap enhanced */}
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
          top: -80,
          right: -80,
          width: 192,
          height: 192,
          borderRadius: "9999px",
          filter: `blur(${touch ? 40 : 75}px)`,
        }}
        className={`${glowClass} transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-40 [@media(hover:hover)]:group-hover:opacity-100"
        }`}
      />

      {/* Bottom line sweeps in on hover / select */}
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

function SkillCard({
  category,
  index,
  isActive,
  onToggle,
  reduceMotion,
}: {
  category: SkillCategory;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const isTouch = useIsTouch();
  const tilt = useTilt(reduceMotion || isTouch, 7);
  const isCyan = category.tone === "cyan";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.reset}
      onTap={() => {
        onToggle();
        tilt.nudge();
      }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      style={tilt.style}
      className={`glass card-hover group relative isolate overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,background-color] duration-300 sm:p-7 ${
        isActive
          ? isCyan
            ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            : "border-purple-400/40 bg-purple-400/[0.05] shadow-[0_0_28px_rgba(168,85,247,0.12)]"
          : isCyan
          ? "border-white/5 [@media(hover:hover)]:hover:border-cyan-400/30 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          : "border-white/5 [@media(hover:hover)]:hover:border-purple-400/30 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
      }`}
    >
      <CardDecor
        active={isActive}
        glowClass={isCyan ? "bg-cyan-400/15" : "bg-purple-500/15"}
        touch={isTouch}
      />

      <div className="relative z-10">
        {/* Card heading */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4">
            <motion.div
              animate={
                isActive && !reduceMotion
                  ? { rotate: -8, scale: 1.08 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-lg transition-colors duration-300 ${
                isCyan
                  ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-400 [@media(hover:hover)]:group-hover:border-cyan-400/50 [@media(hover:hover)]:group-hover:bg-cyan-400/10"
                  : "border-purple-400/30 bg-purple-400/[0.08] text-purple-300 [@media(hover:hover)]:group-hover:border-purple-400/50 [@media(hover:hover)]:group-hover:bg-purple-400/10"
              }`}
            >
              {category.icon}
            </motion.div>

            <h3 className="min-w-0 break-words text-base font-semibold text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-100 sm:text-lg">
              {category.title}
            </h3>
          </div>

          {/* Selected indicator */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: isActive ? 1 : 0.85,
                    rotate: isActive ? 0 : -20,
                  }
            }
            transition={{ type: "spring", stiffness: 250, damping: 16 }}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              isActive
                ? isCyan
                  ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-200"
                  : "border-purple-300/40 bg-purple-300/15 text-purple-200"
                : "border-white/10 text-gray-500 [@media(hover:hover)]:group-hover:border-purple-300/30 [@media(hover:hover)]:group-hover:text-purple-300"
            }`}
            aria-hidden="true"
          >
            {isActive ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="m5 12 4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.div>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2.5">
          {category.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: reduceMotion ? 0 : index * 0.06 + skillIndex * 0.045,
              }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
              className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-300 sm:text-sm ${
                isActive
                  ? isCyan
                    ? "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100"
                    : "border-purple-300/20 bg-purple-300/[0.08] text-purple-100"
                  : "border-white/[0.08] bg-black/20 text-gray-300 [@media(hover:hover)]:group-hover:border-white/15 [@media(hover:hover)]:group-hover:text-white"
              }`}
            >
              {skill}
            </motion.span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
          <span className="flex items-center gap-2 text-xs text-gray-500">
            {isActive && (
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
            )}
            {isActive ? "Category selected" : "Explore this category"}
          </span>

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : { x: isActive ? 0 : 3, opacity: isActive ? 1 : 0.6 }
            }
            className={`text-xs font-medium ${
              isActive
                ? isCyan
                  ? "text-cyan-200"
                  : "text-purple-200"
                : "text-gray-500"
            }`}
          >
            {isActive ? "✓ Active" : "↗"}
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden px-5 py-16 sm:py-24 sm:px-8"
    >
      {/* Ambient background glow (one out-of-flow wrapper, so it can't add spacing) */}
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
            left: "25%",
            top: 80,
            width: 256,
            height: 256,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 60 : 100}px)`,
          }}
          className="bg-cyan-500/[0.07]"
        />
        <div
          style={{
            position: "absolute",
            right: "25%",
            bottom: 40,
            width: 256,
            height: 256,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 60 : 100}px)`,
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
            My Technical Toolkit
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Technologies I work with and skills I continue to develop through
            learning, projects, and practice.
          </p>
        </motion.div>

        {/* Skill cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isActive={activeCategory === index}
              onToggle={() =>
                setActiveCategory((current) =>
                  current === index ? null : index
                )
              }
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: reduceMotion ? 0 : 0.3,
            duration: reduceMotion ? 0 : 0.5,
          }}
          className="mt-7 text-center text-xs text-gray-500"
        >
          Select a category to highlight it
        </motion.p>
      </div>
    </section>
  );
}