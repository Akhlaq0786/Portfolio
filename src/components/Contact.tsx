"use client";

import { motion } from "framer-motion";

const contactLinks = [
  {
    name: "Email",
    value: "eklakhansari389@gmail.com",
    href: "mailto:eklakhansari389@gmail.com",
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

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Background Glow */}
      <div className="glow-orb left-[10%] top-[20%] opacity-30" />
      <div className="glow-orb bottom-[5%] right-[10%] opacity-30" />

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Contact
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Let&apos;s Connect
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            I&apos;m always interested in learning, building new things,
            exploring opportunities, and connecting with people in
            technology. Feel free to reach out.
          </p>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass glow mx-auto mt-12 max-w-4xl rounded-3xl p-8 text-center sm:p-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
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

          <motion.a
            href="mailto:eklakhansari389@gmail.com"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="button-hover mt-8 inline-flex rounded-xl bg-cyan-400 px-7 py-3.5 font-semibold text-black"
          >
            Send Me an Email ↗
          </motion.a>
        </motion.div>

        {/* Contact Links */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {contactLinks.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.href}
              target={contact.name === "Email" ? undefined : "_blank"}
              rel={
                contact.name === "Email"
                  ? undefined
                  : "noopener noreferrer"
              }
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="glass card-hover group rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 font-mono text-sm font-semibold text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15">
                  {contact.icon}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {contact.name}
                  </p>

                  <p className="mt-1 truncate text-sm text-gray-200 transition-colors duration-300 group-hover:text-cyan-300">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          Open to learning, collaboration & opportunities
        </motion.div>
      </div>
    </section>
  );
}