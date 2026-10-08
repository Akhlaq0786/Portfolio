"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.6 }}
      className={`glass glow fixed left-1/2 top-4 z-50 w-[95%] max-w-6xl -translate-x-1/2 rounded-2xl px-5 transition-all duration-300 md:px-6 ${
        scrolled ? "py-3.5 shadow-2xl" : "py-4"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          onClick={() => setIsOpen(false)}
          className="group text-xl font-bold tracking-wide text-white"
        >
          Eklakh
          <motion.span
            className="text-cyan-400"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm text-gray-300 transition-colors duration-300 hover:text-cyan-400"
            >
              {item.name}

              <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Resume */}
        <Link
          href="/resume.pdf"
          download="Eklakh_Ansari_Resume.pdf"
          className="button-hover hidden rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 md:block"
        >
          Resume
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0,
            }}
            className="h-0.5 w-5 bg-gray-200"
          />

          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            className="h-0.5 w-5 bg-gray-200"
          />

          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
            }}
            className="h-0.5 w-5 bg-gray-200"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden md:hidden"
          >
            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-300 transition-all hover:bg-white/5 hover:text-cyan-400"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <Link
                  href="/resume.pdf"
                  download="Eklakh_Ansari_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-center text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-400/20"
                >
                  Download Resume
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}