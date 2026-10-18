"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const EMAIL = "eklakhansari389@gmail.com";

const contactLinks = [
  {
    name: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: "@",
  },
  {
    name: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/eklakh-ansari-21374b425",
    icon: "in",
  },
  {
    name: "GitHub",
    value: "View my projects",
    href: "https://github.com/Akhlaq0786",
    icon: "</>",
  },
];

type ContactLink = (typeof contactLinks)[number];

/**
 * True on touch-first devices (phones/tablets), including when the browser
 * is in "Desktop site" mode. Used to switch off mouse-only effects such as
 * tilt and hover, and to show touch-friendly states regardless of width.
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
function useTilt(reduceMotion: boolean, strength: number) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 22 });

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

  const style = reduceMotion
    ? undefined
    : {
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 900,
      };

  return { onMouseMove, reset, style };
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
              : "opacity-0 group-hover:opacity-100"
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
            ? "opacity-40 group-hover:opacity-100"
            : "opacity-0 group-hover:opacity-100"
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
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </div>
  );
}

function isFocusVisible(element: Element) {
  try {
    return element.matches(":focus-visible");
  } catch {
    return true;
  }
}

/**
 * Link cards are real links, so tapping them navigates.
 * They react to hover, keyboard focus and press-down (no tap-to-toggle).
 */
function ContactCard({
  contact,
  index,
  reduceMotion,
}: {
  contact: ContactLink;
  index: number;
  reduceMotion: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isTouch = useIsTouch();
  const tilt = useTilt(reduceMotion || isTouch, 5);
  const external = contact.name !== "Email";

  return (
    <motion.a
      href={contact.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={reduceMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.12,
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.reset}
      onFocus={(event) => setFocused(isFocusVisible(event.currentTarget))}
      onBlur={() => setFocused(false)}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      style={tilt.style}
      className={`glass card-hover group relative isolate block overflow-hidden rounded-2xl border p-5 outline-none transition-[border-color,box-shadow,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:p-6 ${
        focused
          ? "border-cyan-400/40 bg-cyan-400/[0.05] shadow-[0_0_28px_rgba(34,211,238,0.12)]"
          : "border-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
      }`}
    >
      <CardDecor
        active={focused}
        glowClass="bg-cyan-400/15"
        subtle={false}
        wash={false}
        corner={112}
        blur={50}
        touch={isTouch}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/[0.08] font-mono text-sm font-semibold text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10">
          {contact.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {contact.name}
          </p>

          <p className="mt-1 truncate text-sm text-gray-200 transition-colors duration-300 group-hover:text-cyan-300">
            {contact.value}
          </p>
        </div>

        {/* Arrow nudges up and right on hover */}
        <span
          aria-hidden="true"
          className="shrink-0 text-sm text-gray-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion() ?? false;
  const isTouch = useIsTouch();

  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  async function copyEmail() {
    let success = false;

    try {
      await navigator.clipboard.writeText(EMAIL);
      success = true;
    } catch {
      // Fallback for browsers or contexts without the Clipboard API
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();

      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      } finally {
        document.body.removeChild(field);
      }
    }

    if (!success) return;

    setCopied(true);
    if (copyTimer.current) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  const buttonHover = reduceMotion ? "rest" : "hover";

  return (
    <section
      id="contact"
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
            left: 0,
            top: "20%",
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
        {/* Heading (same entrance as About) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-sm text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            Contact
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            I&apos;m always interested in learning, building new things,
            exploring opportunities, and connecting with people in
            technology. Feel free to reach out.
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.15,
          }}
          className="glass glow card-hover group relative isolate mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl p-6 text-center sm:mt-12 sm:p-12"
        >
          <CardDecor
            active={false}
            glowClass="bg-cyan-400/15"
            corner={260}
            blur={90}
            touch={isTouch}
          />

          <div className="relative z-10">
            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl font-bold text-cyan-400"
            >
              &lt;/&gt;
            </motion.div>

            <h3 className="mt-7 text-2xl font-bold text-white sm:text-3xl">
              Have an idea or opportunity?
            </h3>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
              Whether it&apos;s a project, internship opportunity,
              collaboration, or simply a conversation about technology,
              I&apos;d be happy to connect.
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              {/* Primary: light sweeps left to right on hover */}
              <motion.a
                href={`mailto:${EMAIL}`}
                initial="rest"
                animate="rest"
                whileHover={buttonHover}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                variants={{
                  rest: { y: 0, scale: 1 },
                  hover: { y: -4, scale: 1.02 },
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="button-hover relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-xl bg-cyan-400 px-7 py-3.5 font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18]"
              >
                <motion.span
                  aria-hidden="true"
                  variants={{
                    rest: { x: "-130%" },
                    hover: { x: "330%" },
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
                <span className="relative">Send Me an Email ↗</span>
              </motion.a>

              {/* Secondary: copy the address (handy when no mail app is set up) */}
              <motion.button
                type="button"
                onClick={copyEmail}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3.5 font-semibold text-white outline-none transition-colors duration-200 hover:border-purple-300/30 hover:bg-purple-300/[0.07] focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c18]"
              >
                <span aria-live="polite">
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-block ${
                      copied ? "text-green-300" : ""
                    }`}
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contact Links */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {contactLinks.map((contact, index) => (
            <ContactCard
              key={contact.name}
              contact={contact}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* Availability */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.3,
          }}
          className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-gray-500"
        >
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { opacity: [1, 0.4, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-2 shrink-0 rounded-full bg-green-400"
          />
          Open to learning, collaboration &amp; opportunities
        </motion.div>
      </div>
    </section>
  );
}