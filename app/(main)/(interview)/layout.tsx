import { LogoIcon } from "@/components/logo/index";
import Link from "next/link";
import { DisclaimerButton } from "@/components/disclaimer-button";
import Image from "next/image";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
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

      <Image
        className="absolute inset-0 z-[-2]"
        src="/assets/background.png"
        alt="Background"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <DisclaimerButton />
    </div>
  );
}
