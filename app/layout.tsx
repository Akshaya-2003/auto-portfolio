import type { Metadata } from "next";
import { Michroma } from "next/font/google";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Automotive Photography and Production by Akshaya Krishna P and Nidhish S Kumar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`${michroma.className} min-h-full flex flex-col bg-[#030303] text-white`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
