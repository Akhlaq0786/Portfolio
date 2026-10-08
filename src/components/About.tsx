"use client";

import { motion } from "framer-motion";

const aboutCards = [
  {
    title: "Who I Am",
    description:
      "I am a Computer Science graduate currently pursuing my MCA at Thakur Institute of Management Studies, Career Development and Research. I am interested in software development, quality assurance, and program management, while continuously learning and building practical projects.",
    icon: "</>",
  },
  {
    title: "What I Do",
    description:
      "I enjoy building web applications, solving programming problems, exploring modern technologies, and improving the quality and reliability of software through testing and debugging.",
    icon: "✦",
  },
];

const quickInfo = [
  {
    label: "MCA",
    value: "Thakur Institute of Management Studies, Career Development and Research",
    detail: "2026 – 2028",
  },
  {
    label: "B.Sc.",
    value: "Computer Science",
    detail: "2022 – 2025",
  },
  {
    label: "Interests",
    value: "Development • QA • Program Management",
    detail: "Always Learning",
  },
  {
    label: "Currently",
    value: "Learning & Building",
    detail: "Open to Opportunities",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            About Me
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            A little{" "}
            <span className="gradient-text">about me</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A Computer Science graduate and MCA student focused on learning,
            building, and growing through practical technology projects.
          </p>
        </motion.div>

        {/* About Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              className="glass card-hover rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 font-mono text-lg text-cyan-400">
                  {card.icon}
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm leading-7 text-gray-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6"
        >
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                Quick Info
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-white">
                Education & Focus
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quickInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }}
                  className="card-hover rounded-xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-cyan-400">
                      {info.label}
                    </span>

                    <span className="text-xs text-gray-600">
                      {info.detail}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-6 text-gray-200">
                    {info.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}