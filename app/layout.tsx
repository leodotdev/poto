import type { Metadata } from "next";
import { Sanchez, IBM_Plex_Mono, Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ParticleField from "@/components/ui/particle-field";
import "./globals.css";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sanchez = Sanchez({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://poetictoolbox.com"
  ),
  title: {
    default: "The Poetic Toolbox",
    template: "%s | The Poetic Toolbox",
  },
  description:
    "A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.",
  keywords: [
    "creativity",
    "art",
    "poetry",
    "self-expression",
    "mindfulness",
    "creative rituals",
  ],
  authors: [{ name: "The Poetic Toolbox Team" }],
  creator: "The Poetic Toolbox",
  publisher: "The Poetic Toolbox",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Poetic Toolbox",
    title: "The Poetic Toolbox",
    description:
      "A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Poetic Toolbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Poetic Toolbox",
    description:
      "A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, recovering perfectionists, and overthinkers with good hearts.",
    images: ["/og-image.jpg"],
    creator: "@poetictoolbox",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${geistSans.variable} ${sanchez.variable} ${ibmPlexMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "neon"]}
        >
          <ParticleField />
          <Navbar />
          <main className="flex-1 flex flex-col items-center">
            <div className="w-full">{children}</div>
          </main>
          <Footer />
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
