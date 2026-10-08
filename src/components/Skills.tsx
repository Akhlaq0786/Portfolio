"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming & Web",
    icon: "</>",
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
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Project Coordination",
      "Program Management",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Background Glow */}
      <div className="glow-orb left-[5%] top-[30%] opacity-40" />

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Skills
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Technologies & Skills
          </h2>

          <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-400 to-transparent" />

          <p className="mt-5 max-w-2xl text-gray-400">
            Technologies and skills I am learning and developing through
            academics, projects, and hands-on practice.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-6 sm:grid-cols-2">

          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
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
              {/* Category Header */}
              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-400">
                  {category.icon}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {category.skills.length} skills
                  </p>
                </div>

              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className="cursor-default rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-cyan-400/5 hover:text-cyan-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}