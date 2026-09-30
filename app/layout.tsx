import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import PageBackground from "@/components/layout/PageBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Rick and Morty Explorer",
    template: "%s | Rick and Morty Explorer",
  },
  description:
    "Explora personajes, episodios y ubicaciones del multiverso de Rick and Morty.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-brand selection:text-black`}>
        <PageBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
