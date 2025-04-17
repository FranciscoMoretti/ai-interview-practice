import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Mock Interview",
  description: "AI Mock Interview, powered by ElevenLabs Conversational AI.",
  keywords: [
    "AI Mock Interview",
    "Mock Interview",
    "Interview",
    "Interview Practice",
    "Interview Preparation",
    "Interview Questions",
    "Interview Answers",
    "Interview Feedback",
    "Interview Score",
    "Interview Report",
    "ElevenLabs",
    "AI Chat",
    "Conversational AI",
  ],
  openGraph: {
    title: "AI Mock Interview | ElevenLabs",
    description: "AI Mock Interview, powered by ElevenLabs Conversational AI.",

    type: "website",
    locale: "en_US",
    siteName: "AI Mock Interview",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mock Interview | ElevenLabs",
    description:
      "Practice your interview skills with AI mock interviews, powered by ElevenLabs Conversational AI.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
