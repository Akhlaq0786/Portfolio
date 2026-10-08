"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "VisualizeX",
    category: "Algorithm Visualizer & Online IDE",
    description:
      "An interactive web platform designed to help users understand algorithms through visualizations while providing an integrated online coding environment for writing and executing code.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "D3.js",
      "Python",
      "Monaco Editor",
    ],
    github: "https://github.com/Akhlaq0786/VisualizeX.git",
    demo: "https://visualize-x.vercel.app",
  },
];

const algorithms = [
  "bubbleSort",
  "quickSort",
  "mergeSort",
  "insertionSort",
  "selectionSort",
];

export default function Projects() {
  const [algorithmIndex, setAlgorithmIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlgorithmIndex((prev) => (prev + 1) % algorithms.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentAlgorithm = algorithms[algorithmIndex];

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24"
    >
      <div className="glow-orb left-[5%] top-[20%] opacity-40" />
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
            Projects
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Things I've Built
          </h2>

          <div className="mt-4 h-px w-20 bg-gradient-to-r from-cyan-400 to-transparent" />

          <p className="mt-5 max-w-2xl text-gray-400">
            A selection of projects where I apply my technical knowledge,
            experiment with new technologies, and solve practical problems.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
              className="glass card-hover group relative overflow-hidden rounded-3xl"
            >
              {/* Top Glow */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="grid md:grid-cols-[1fr_1.5fr]">
                {/* Project Preview */}
                <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-b border-white/5 bg-black/20 p-8 md:min-h-[360px] md:border-b-0 md:border-r">
                  {/* Background Grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Decorative Orbs */}
                  <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl" />

                  {/* Code Window */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#080c18] shadow-2xl"
                  >
                    {/* Window Header */}
                    <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />

                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />

                      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                      <span className="ml-3 text-xs text-gray-500">
                        visualizeX.tsx
                      </span>
                    </div>

                    {/* Code */}
                    <div className="space-y-2 p-5 font-mono text-xs leading-5">
                      <p>
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-cyan-300">
                          algorithm
                        </span>{" "}
                        ={" "}
                        <motion.span
                          key={currentAlgorithm}
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="inline-block text-yellow-300"
                        >
                          &quot;{currentAlgorithm}&quot;
                        </motion.span>
                      </p>

                      <p className="text-gray-500">
                        // visualize each step
                      </p>

                      <p>
                        <span className="text-purple-400">
                          function
                        </span>{" "}
                        <span className="text-blue-300">
                          visualize
                        </span>
                        () {"{"}
                      </p>

                      <p className="pl-4 text-gray-400">
                        renderAlgorithm(algorithm);
                      </p>

                      <p>{"}"}</p>

                      {/* Status */}
                      <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-4">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                        <motion.span
                          key={currentAlgorithm}
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="text-green-400"
                        >
                          Ready to visualize
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Project Information */}
                <div className="flex flex-col justify-center p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-cyan-400">
                      {project.number}
                    </span>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
                      Featured Project
                    </span>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-cyan-400">
                    {project.category}
                  </p>

                  <p className="mt-6 max-w-2xl leading-7 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-7">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <motion.span
                          key={technology}
                          whileHover={{
                            scale: 1.06,
                            y: -2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                          className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-300"
                        >
                          {technology}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/10"
                    >
                      GitHub ↗
                    </a>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-hover rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black"
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}