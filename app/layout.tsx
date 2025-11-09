import { ChatBotWidget } from "@/components/ChatBot";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const robotoFont = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: "Rag ComplyAI",
  description:
    "Rag ComplyAI is an advanced compliance analytics platform powered by AI, specializing in regulatory submissions and FDA documentation analysis.",
  keywords: ["compliance", "AI", "regulatory", "FDA", "analytics", "platform"],

  openGraph: {
    title: "Rag ComplyAI",
    description:
      "Rag ComplyAI is an advanced compliance analytics platform powered by AI, specializing in regulatory submissions and FDA documentation analysis.",
    url: siteUrl ?? "http://localhost:3000",
    siteName: "Rag ComplyAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: "open graph image of rag ComplyAI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rag ComplyAI",
    description:
      "Rag ComplyAI is an advanced compliance analytics platform powered by AI, specializing in regulatory submissions and FDA documentation analysis.",
    images: [`/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${robotoFont.className} antialiased`}>
        <ChatBotWidget />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
