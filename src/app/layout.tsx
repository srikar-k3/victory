import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load brand fonts
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter", weight: ["400","500","600","700"] });
const sora = Sora({ subsets: ["latin"], display: "swap", variable: "--font-sora", weight: ["400","500","600","700"] });

export const metadata: Metadata = {
  title: "Victory",
  description: "Empowering women. Strengthening communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <Navbar />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
