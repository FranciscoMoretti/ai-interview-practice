"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LanguageDropdown, LANGUAGES } from "@/components/language-dropdown";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CallButtonProps {
  status: "disconnected" | "connecting" | "connected" | "disconnecting";
  startCall: () => void;
  hasMediaAccess: boolean;
  requestMediaPermissions: () => void;
  language: string | null;
  setLanguage: (value: string) => void;
  languages: typeof LANGUAGES;
  difficulty: string;
  setDifficulty: (value: string) => void;
  topic: string;
  setTopic: (value: string) => void;
}

const RINGING_PHONE_AUDIO_DURATION = 6000;

const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function CallButton({
  status,
  startCall,
  hasMediaAccess,
  requestMediaPermissions,
  language,
  setLanguage,
  languages,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
}: CallButtonProps) {
  const [isCalling, setIsCalling] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [ringingPhoneAudio] = useState(() => {
    if (typeof Audio !== "undefined") {
      const audioInstance = new Audio("/assets/ringing-phone.mp3");
      audioInstance.loop = true;
      return audioInstance;
    }
    return null;
  });

  const onCallClick = () => {
    if (!hasMediaAccess) {
      requestMediaPermissions();
      return;
    }
    setShowAgeModal(true);
  };

  const handleAgeConfirm = () => {
    setShowAgeModal(false);
    setIsCalling(true);
    ringingPhoneAudio?.play();
    setTimeout(() => {
      ringingPhoneAudio?.pause();
      ringingPhoneAudio?.load();
      startCall();
    }, RINGING_PHONE_AUDIO_DURATION);
  };

  return (
    <>
      {!isCalling && (
        <div className={"text-gray-700 flex items-center gap-2 text-sm mb-2"}>
          For the best experience, find a quiet place
        </div>
      )}
      <Button
        variant="default"
        onClick={onCallClick}
        disabled={isCalling || status !== "disconnected"}
        className={cn(
          "relative w-64 h-16 rounded-full  border-2  backdrop-blur-[16px] shadow-2xl",
          isCalling && "bg-blue-900/90"
        )}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Image
            src="/assets/interviewer.png"
            alt="Santa"
            className="rounded-full"
            width={48}
            height={48}
          />
          <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        {!isCalling && (
          <>
            <span className="text-lg ml-10 font-semibold">Start Interview</span>
          </>
        )}
        {isCalling && (
          <>
            <span className="text-lg ml-10 font-semibold">Ringing...</span>
            <span className="ml-2">
              <Loader2 className="w-4 h-4 animate-spin" />
            </span>
          </>
        )}
      </Button>

      {!isCalling && (
        <div className={"text-sm"}>
          <span className="text-gray-700">Powered by</span>{" "}
          <Link
            target="_blank"
            href="https://elevenlabs.io/conversational-ai"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-blue-600 pl-0"
            )}
          >
            ElevenLabs Conversational AI
          </Link>
        </div>
      )}

      {!isCalling && (
        <div className={"flex flex-col gap-3 mt-4"}>
          <div className="flex items-center gap-2">
            <Label htmlFor="language" className="text-gray-700 w-24">
              Language:
            </Label>
            <LanguageDropdown
              language={language}
              setLanguage={setLanguage}
              languages={languages}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="difficulty" className="text-gray-700 w-24">
              Difficulty:
            </Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[180px] transition-colors">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map((level) => (
                  <SelectItem
                    key={level.value}
                    value={level.value}
                    className=" cursor-pointer"
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="topic" className="text-gray-700 w-24">
              Topic:
            </Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-[180px] transition-colors bg-white border-gray-300 text-gray-900"
              placeholder="e.g. JavaScript, React"
            />
          </div>
        </div>
      )}
      
      <Dialog open={showAgeModal} onOpenChange={setShowAgeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Age Verification</DialogTitle>
            <DialogDescription>
              Please confirm that you are 18 years or older to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-y-2">
            <Button variant="outline"  onClick={() => setShowAgeModal(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleAgeConfirm}>I confirm I am 18+</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
