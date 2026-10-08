"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Thakur Institute of Management Studies, Career Development and Research",
    period: "2026 – 2028",
    description:
      "Currently pursuing a postgraduate degree focused on computer applications, software development, advanced technical concepts, and practical problem-solving.",
    current: true,
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Model College",
    period: "2022 – 2025",
    description:
      "Completed a bachelor's degree in Computer Science with a foundation in programming, databases, web technologies, algorithms, and software development.",
    current: false,
  },
  {
    degree: "Higher Secondary Certificate (HSC) – Science",
    institution: "Model College",
    period: "2022",
    description:
      "Completed higher secondary education in the Science stream, building a strong foundation in mathematics, science, and computer-related concepts.",
    current: false,
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Background Glow */}
      <div className="glow-orb left-[5%] top-[20%] opacity-30" />
      <div className="glow-orb bottom-[10%] right-[5%] opacity-30" />

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
            Education
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            My Academic Journey
          </h2>

          <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-400 to-transparent" />

          <p className="mt-5 max-w-2xl text-gray-400">
            My academic background and the knowledge I've developed
            throughout my journey in computer science.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-white/10 to-transparent sm:left-4" />

          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
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
                    delay: index * 0.12 + 0.2,
                  }}
                  className={`absolute left-0 top-7 flex h-7 w-7 items-center justify-center rounded-full border bg-[#050816] sm:left-[3px] ${
                    item.current
                      ? "border-cyan-400/60"
                      : "border-white/20"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      item.current
                        ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                        : "bg-gray-500"
                    }`}
                  />
                </motion.div>

                {/* Education Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="glass card-hover rounded-2xl p-6 sm:p-8"
                >
                  {/* Top Row */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium uppercase tracking-wider text-cyan-400">
                          {item.institution}
                        </span>

                        {item.current && (
                          <span className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-3 py-1 text-xs text-green-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            Currently Studying
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                        {item.degree}
                      </h3>
                    </div>

                    {/* Period */}
                    <span className="w-fit rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                      {item.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-6 max-w-3xl leading-7 text-gray-400">
                    {item.description}
                  </p>

                  {/* Bottom Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.current ? (
                      <>
                        <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                          Computer Applications
                        </span>

                        <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                          Software Development
                        </span>

                        <span className="rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-xs text-cyan-300">
                          Advanced Computing
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                          Computer Science
                        </span>

                        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                          Programming
                        </span>

                        <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-400">
                          Web Technologies
                        </span>
                      </>
                    )}
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