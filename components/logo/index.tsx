"use client";

import { cn } from "@/lib/utils";
import { Mic } from "lucide-react";

/** @knipignore */
export const LogoIcon = ({ className }: { className?: string }) => {
  return (
    <Mic className={cn("w-6 h-6 text-white", className)}/>
  );
};
