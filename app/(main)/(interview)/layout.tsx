import { LogoIcon } from "@/components/logo/index";
import Link from "next/link";
import { DisclaimerButton } from "@/components/disclaimer-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Mock Interview | Practice Platform",
  description: "AI-powered interview practice platform built with ElevenLabs Conversational AI SDK",
  keywords: ["interview practice", "AI interview", "mock interview", "ElevenLabs"],
  authors: [{ name: "AI Interview Practice Team" }],
  openGraph: {
    title: "AI Mock Interview | Practice Platform",
    description: "AI-powered interview practice platform built with ElevenLabs Conversational AI SDK",
    siteName: "AI Interview Practice",
    locale: "en_US",
    type: "website",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-10">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon />
          <span className="text-white text-2xl font-bold">AI Mock Interview</span>
        </Link>
      </div>

      <main>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </main>


      <DisclaimerButton />
    </div>
  );
}
