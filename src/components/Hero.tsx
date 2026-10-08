"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[620px] items-center overflow-hidden px-6 pt-28 md:min-h-screen"
    >
      {/* Background Glow */}
      <div className="glow-orb left-[10%] top-[20%]" />
      <div className="glow-orb bottom-[10%] right-[5%]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Small Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400"
          >
            MCA Student • Computer Science Graduate
          </motion.p>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            Hi, I'm{" "}
            <motion.span
              animate={{
              textShadow: [
                "0 0 20px rgba(129,140,248,0.25)",
                "0 0 35px rgba(34,211,238,0.35)",
                "0 0 20px rgba(129,140,248,0.25)",
                ],
              }}
              transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              }}
              className="gradient-text inline-block"
              >
                Eklakh
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-2xl font-semibold text-gray-300 sm:text-3xl"
          >
            I build things for the web.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg"
          >
            I'm a Computer Science graduate currently pursuing my MCA at
            Thakur Institute of Management Studies, Career Development and Research. I'm passionate about
            software development, quality assurance, and program management,
            with a strong interest in solving problems, building reliable
            applications, and collaborating with teams to turn ideas into
            impactful solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="#projects"
              className="button-hover rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black"
            >
              View Projects
            </Link>

            <Link
              href="/resume.pdf"
              download="Eklakh_Ansari_Resume.pdf"
              className="button-hover rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md"
            >
              Download Resume
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex gap-6 text-sm text-gray-400"
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

        {/* Right Developer Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex md:justify-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass glow relative flex h-80 w-80 items-center justify-center rounded-3xl p-8"
          >
            {/* Decorative circles */}
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border border-cyan-400/20 bg-cyan-400/5 blur-sm" />

            <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full border border-purple-400/20 bg-purple-400/5 blur-sm" />

            <div className="relative text-center">

              {/* Code Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="mb-5 text-7xl font-bold text-cyan-400"
              >
                &lt;/&gt;
              </motion.div>

              <p className="text-xl font-semibold text-white">
                Developer
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Code • Learn • Build
              </p>

              {/* Small status */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Currently learning & building
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}