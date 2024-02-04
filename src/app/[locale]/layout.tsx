import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "@/styles/globals.css";
import { QueryProvider } from "@/provider/QueryProvider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.guimoraes.dev"),
  referrer: "origin-when-cross-origin",
  keywords: ["confer-all", "Confer All", "Next.js", "React", "JavaScript"],
  authors: { name: "Guilherme Moraes" },
  creator: "Guilherme Moraes",
  publisher: "Guilherme Moraes",
  title: {
    default: "Guilherme Moraes | Frontend engineer",
    template: "%s | Guilherme Moraes",
  },
  description: "I am a passionate front-end engineer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Guilherme Moraes",
    description: "I am a passionate front-end engineer",
    url: "/",
    siteName: "Guilherme Moraes | Frontend engineer",
    images: [
      {
        url: "/img/cover/256p.png",
        width: 256,
        height: 256,
      },
      {
        url: "/img/cover/800p.png",
        width: 800,
        height: 600,
      },
      {
        url: "/img/cover/1800p.png",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Moraes | Frontend engineer",
    description: "I am a passionate front-end engineer",
    creator: "Guilherme Moraes",
    images: ["/img/cover/800p.png"],
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} className="scroll-smooth">
      <body
        style={lato.style}
        className="flex h-[100dvh] w-full flex-col items-center gap-3 bg-plum-900"
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
