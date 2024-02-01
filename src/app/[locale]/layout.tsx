import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "@/styles/globals.css";
import { QueryProvider } from "@/provider/QueryProvider";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
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
    url: "https://www.guimoraes.dev/",
    siteName: "Guilherme Moraes | Frontend engineer",
    images: [
      {
        url: "https://www.guimoraes.dev/img/cover.webp",
        width: 1200,
        height: 630,
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
    images: ["https://www.guimoraes.dev/img/cover.webp"],
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
    <html lang={locale}>
      <body
        style={lato.style}
        className="flex h-[100dvh] w-full flex-col items-center gap-3 bg-plum-900"
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
