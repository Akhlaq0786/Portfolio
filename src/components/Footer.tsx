"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5 px-6 pb-8 pt-16">
      {/* Background Glow */}
      <div className="glow-orb left-[10%] top-0 opacity-20" />
      <div className="glow-orb bottom-0 right-[10%] opacity-20" />

      <div className="mx-auto max-w-6xl">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#home"
              className="group inline-flex items-center text-2xl font-bold tracking-wide text-white"
            >
              Eklakh
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
              Computer Science graduate and MCA student passionate about
              software development, quality assurance, and building
              meaningful technology.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/Akhlaq0786"
                target="_blank"
                rel="noopener noreferrer"
                className="button-hover rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-400"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/eklakh-ansari-21374b425"
                target="_blank"
                rel="noopener noreferrer"
                className="button-hover rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-400"
              >
                LinkedIn ↗
              </a>

              <a
                href="mailto:eklakhansari389@gmail.com"
                className="button-hover rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 transition-colors hover:border-cyan-400/30 hover:text-cyan-400"
              >
                Email ↗
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-500 transition-colors duration-300 hover:text-cyan-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Currently */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Currently
            </h3>

            <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                <span className="text-sm text-gray-300">
                  Learning & Building
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Pursuing MCA and continuously developing my skills through
                projects and hands-on learning.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-center text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {currentYear} Eklakh Abdulkhalik Ansari. All rights reserved.
          </p>

          <p className="text-gray-500">
            Code <span className="text-cyan-400">•</span> Learn{" "}
            <span className="text-cyan-400">•</span> Build{" "}
            <span className="text-cyan-400">•</span> Grow
          </p>
        </div>
      </div>
      {showTopButton && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#080c18]/90 text-cyan-400 shadow-lg backdrop-blur-md transition-colors hover:bg-cyan-400/10"
        >
          ↑
        </motion.button>
      )}
    </footer>
  );
}