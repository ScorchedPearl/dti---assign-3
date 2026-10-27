import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Source_Serif_4({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "IIITA Registration Experience · Group 10",
  description:
    "Design Thinking project by Group 10: how first year students experience registration at IIITA, and our ReadyPass and Gate-to-Room Pass concepts. Empathize, Define and Ideate explained with motion graphics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
