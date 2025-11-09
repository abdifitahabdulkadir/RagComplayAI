import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
const robotoFont = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});
export const metadata: Metadata = {
  title: "REG Comply AI",
  description:
    "REG Comply AI is a platform for FDA compliance, document upload, and compliance analytics. Easily upload regulatory documents and get instant insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${robotoFont.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
