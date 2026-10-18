"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const experiences = [
  {
    role: "Currently Building & Learning",
    company: "Personal & Academic Projects",
    period: "2025 – Present",
    description:
      "Developing practical skills through academic and personal projects while exploring software development, quality assurance, and program management.",
    tags: ["Learning", "Development", "Projects"],
  },
];

type ExperienceItem = (typeof experiences)[number];

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
 * identical to the one used in About, Education, Skills and Projects.
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

function ExperienceTimelineItem({
  experience,
  index,
  reduceMotion,
}: {
  experience: ExperienceItem;
  index: number;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();
  const tilt = useTilt(reduceMotion || isTouch, 7);

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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/60 bg-[#080c18] shadow-[0_0_20px_rgba(34,211,238,0.18)] sm:h-11 sm:w-11"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300/20 to-purple-400/20 sm:h-8 sm:w-8">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          </span>
        </motion.div>
      </motion.div>

      {/* Interactive card */}
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={() => {
          tilt.reset();
          setActive(false);
        }}
        onTap={() => {
          setActive((previous) => !previous);
          tilt.nudge();
        }}
        whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={tilt.style}
        className={`glass card-hover group relative isolate overflow-hidden rounded-2xl border p-5 transition-[border-color,box-shadow,background-color] duration-300 sm:p-7 ${
          active
            ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            : "border-white/5 [@media(hover:hover)]:hover:border-cyan-400/30 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
        }`}
      >
        <CardDecor
          active={active}
          glowClass="bg-cyan-400/15"
          touch={isTouch}
        />

        <div className="relative z-10">
          {/* Company and status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300 sm:text-sm">
              {experience.company}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.07] px-3 py-1 text-[11px] font-medium text-green-300">
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
              In Progress
            </span>
          </div>

          {/* Role and period */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="max-w-2xl break-words text-lg font-semibold leading-snug text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-100 sm:text-xl lg:text-2xl">
              {experience.role}
            </h3>

            <span className="w-fit shrink-0 rounded-lg border border-cyan-300/25 bg-cyan-300/[0.07] px-3 py-1.5 font-mono text-xs text-cyan-200">
              {experience.period}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-[15px]">
            {experience.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {experience.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : 0.2 + tagIndex * 0.045,
                }}
                className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.045] px-3 py-1.5 text-[11px] text-cyan-100/80 transition-colors duration-200 [@media(hover:hover)]:hover:border-cyan-300/35 sm:text-xs"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-white/[0.08] pt-4">
            <span className="text-[11px] text-gray-500">
              Currently expanding my knowledge
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

export default function Experience() {
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();

  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24"
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
            right: 0,
            top: "25%",
            width: 288,
            height: 288,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-cyan-500/[0.06]"
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 288,
            height: 288,
            borderRadius: "9999px",
            filter: `blur(${isTouch ? 70 : 110}px)`,
          }}
          className="bg-purple-500/[0.07]"
        />
      </div>

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
            Experience
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            My <span className="gradient-text">Journey</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            My current journey of learning, building projects, and developing
            practical technical skills.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline track */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-cyan-300/70 via-purple-400/40 to-transparent sm:left-[23px]"
          />

          {/* Track that draws itself on scroll */}
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
            {experiences.map((experience, index) => (
              <ExperienceTimelineItem
                key={experience.role}
                experience={experience}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}