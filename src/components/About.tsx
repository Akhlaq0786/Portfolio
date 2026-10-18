"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const aboutCards = [
  {
    title: "Who I Am",
    description:
      "I am a Computer Science graduate currently pursuing my MCA at Thakur Institute of Management Studies, Career Development and Research. I am interested in software development, quality assurance, and program management, while continuously learning and building practical projects.",
    icon: "</>",
    tone: "cyan" as const,
  },
  {
    title: "What I Do",
    description:
      "I enjoy building web applications, solving programming problems, exploring modern technologies, and improving the quality and reliability of software through testing and debugging.",
    icon: "✦",
    tone: "purple" as const,
  },
];

const quickInfo = [
  {
    label: "MCA",
    value:
      "Thakur Institute of Management Studies, Career Development and Research",
    detail: "2026 – 2028",
    live: false,
  },
  {
    label: "B.Sc.",
    value: "Computer Science",
    detail: "2022 – 2025",
    live: false,
  },
  {
    label: "Interests",
    value: "Development • QA • Program Management",
    detail: "Always Learning",
    live: false,
  },
  {
    label: "Currently",
    value: "Learning & Building",
    detail: "Open to Opportunities",
    live: true,
  },
];

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
 * used by every interactive card so they all feel identical.
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

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
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

/* ------------------------------------------------------------------ */
/* Large About cards                                                   */
/* ------------------------------------------------------------------ */

function InteractiveAboutCard({
  card,
  index,
  reduceMotion,
}: {
  card: (typeof aboutCards)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();
  const tilt = useTilt(reduceMotion || isTouch, 7);
  const isCyan = card.tone === "cyan";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
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
      style={tilt.style}
      className={`glass card-hover group relative isolate overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,background-color] duration-300 sm:p-7 ${
        active
          ? isCyan
            ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
            : "border-purple-400/40 bg-purple-400/[0.05] shadow-[0_0_28px_rgba(168,85,247,0.12)]"
          : isCyan
          ? "border-white/5 [@media(hover:hover)]:hover:border-cyan-400/30 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          : "border-white/5 [@media(hover:hover)]:hover:border-purple-400/30 [@media(hover:hover)]:hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
      }`}
    >
      <CardDecor
        active={active}
        glowClass={isCyan ? "bg-cyan-400/15" : "bg-purple-500/15"}
        touch={isTouch}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-4">
          <motion.div
            animate={
              active && !reduceMotion
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
            {card.icon}
          </motion.div>

          <h3 className="text-xl font-semibold text-white transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-100">
            {card.title}
          </h3>
        </div>

        <p className="text-sm leading-7 text-gray-400">{card.description}</p>

        {isTouch && (
          <p className="mt-4 text-xs font-medium text-cyan-400/70">
            Tap card to interact
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Quick-info cards                                                    */
/* ------------------------------------------------------------------ */

function InfoCard({
  info,
  index,
  reduceMotion,
}: {
  info: (typeof quickInfo)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const isTouch = useIsTouch();
  const tilt = useTilt(reduceMotion || isTouch, 5);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.07,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => {
        tilt.reset();
        setActive(false);
      }}
      onTap={() => {
        setActive((previous) => !previous);
        tilt.nudge();
      }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      style={tilt.style}
      className={`card-hover group relative isolate overflow-hidden rounded-xl border p-5 transition-[border-color,background-color,box-shadow] duration-300 ${
        active
          ? "border-cyan-400/35 bg-cyan-400/[0.06] shadow-[0_0_24px_rgba(34,211,238,0.10)]"
          : "border-white/5 bg-white/[0.02] [@media(hover:hover)]:hover:border-cyan-400/25 [@media(hover:hover)]:hover:bg-cyan-400/[0.04]"
      }`}
    >
      <CardDecor
        active={active}
        glowClass="bg-cyan-400/15"
        subtle={false}
        wash={false}
        corner={112}
        blur={50}
        touch={isTouch}
      />

      <div className="relative z-10">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-cyan-400 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-cyan-300">
            {info.label}
          </span>

          <span className="text-right text-xs text-gray-600 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-gray-400">
            {info.detail}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {info.live && (
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"
            />
          )}

          <p className="text-sm font-medium leading-6 text-gray-200">
            {info.value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function About() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden px-6 py-16 sm:py-24 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Ambient cyan and purple glow (same as Education) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[70px] md:blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/[0.07] blur-[70px] md:blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            About Me
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            A little <span className="gradient-text">about me</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            An MCA professional in the making, focused on learning, building,
            and growing through practical technology projects while developing
            strong technical, problem-solving, and coordination skills.
          </p>
        </motion.div>

        {/* Interactive About cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {aboutCards.map((card, index) => (
            <InteractiveAboutCard
              key={card.title}
              card={card}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Quick information */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.1,
          }}
          className="mt-6"
        >
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-7 flex items-end gap-5">
              <div className="shrink-0">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Quick Info
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Education &amp; Focus
                </h3>
              </div>

              {/* Line that draws itself, echoing the Education timeline */}
              <motion.div
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.2,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : 0.3,
                }}
                className="mb-2.5 hidden h-px flex-1 origin-left bg-gradient-to-r from-cyan-300/70 via-purple-400/40 to-transparent sm:block"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickInfo.map((info, index) => (
                <InfoCard
                  key={info.label}
                  info={info}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}