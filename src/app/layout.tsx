import type { Metadata } from "next";
import "./globals.css";
import "../styles/portfolio.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://eklakh-portfolio.vercel.app"),
  
  title: "Eklakh Ansari | Portfolio",
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
    title: "Eklakh Ansari | MCA | Developer",
    description:
      "MCA professional focused on software development, modern web technologies, and building practical applications.",
    type: "website",
    siteName: "Eklakh Ansari Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eklakh Ansari - MCA Student & Computer Science Graduate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eklakh Ansari | MCA Student & Computer Science Graduate",
    description:
      "Computer Science graduate and MCA student focused on software development, QA, and building practical web applications.",
    images: ["/og-image.png"],
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