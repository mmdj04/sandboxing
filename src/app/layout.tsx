import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open-Source Agentic Infrastructure",
  description: "Open-Source Agentic Infrastructure",
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
