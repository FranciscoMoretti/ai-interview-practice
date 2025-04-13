'use client';

import { ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function DisclaimerButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/disclaimer')}
      className="flex items-center gap-1 text-xs transition-colors"
    >
      <ScrollText size={14} />
      <span>Privacy Policy</span>
    </Button>
  );
}