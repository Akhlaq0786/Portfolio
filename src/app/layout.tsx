import type { Metadata } from "next";
import "./globals.css";
import "../styles/portfolio.css";

export const metadata: Metadata = {
  title: "Eklakh Ansari | MCA Student & Computer Science Graduate",
  description:
    "Portfolio of Eklakh Ansari, a Computer Science graduate and MCA student focused on software development, quality assurance, and building practical web applications.",
    keywords: [
    "Eklakh Ansari",
    "Eklakh",
    "Computer Science",
    "MCA Student",
    "Software Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "VisualizeX",
    "Portfolio",
  ],
  authors: [
    {
      name: "Eklakh Ansari",
    },
  ],
  creator: "Eklakh Ansari",
  openGraph: {
    title: "Eklakh Ansari | MCA Student & Computer Science Graduate",
    description:
      "Computer Science graduate and MCA student building practical web applications and exploring software development, QA, and modern technologies.",
    type: "website",
    siteName: "Eklakh Ansari Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Eklakh Ansari | MCA Student & Computer Science Graduate",
    description:
      "Computer Science graduate and MCA student focused on software development, QA, and building practical web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}