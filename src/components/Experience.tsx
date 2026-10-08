"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Currently Building & Learning",
    company: "Personal & Academic Projects",
    period: "2025 – Present",
    description:
      "Developing practical skills through academic and personal projects while exploring software development, quality assurance, and program management.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden px-6 py-24"
    >
      <div className="glow-orb right-[5%] top-[25%] opacity-40" />

      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Experience
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            My Journey
          </h2>

          <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-400 to-transparent" />

          <p className="mt-5 max-w-2xl text-gray-400">
            My current journey of learning, building projects, and
            developing practical technical skills.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/50 via-white/10 to-transparent sm:left-4" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative pl-10 sm:pl-12"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.2,
                  }}
                  className="absolute left-0 top-7 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-400/40 bg-[#050816] sm:left-[3px]"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="glass card-hover rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                        {experience.company}
                      </p>

                      <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                        {experience.role}
                      </h3>
                    </div>

                    <span className="w-fit rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                      {experience.period}
                    </span>
                  </div>

                  <p className="mt-6 max-w-3xl leading-7 text-gray-400">
                    {experience.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                      Learning
                    </span>

                    <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                      Development
                    </span>

                    <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                      Projects
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}