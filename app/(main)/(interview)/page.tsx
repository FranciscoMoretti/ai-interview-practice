"use client";

import {
  getAgentSignedUrl,
} from "@/app/(main)/(interview)/actions/actions";
import { CallButton } from "@/components/call-button";
import { Orb } from "@/components/orb";
import { InterviewCard } from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConversation } from "@11labs/react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { LANGUAGES } from "@/components/language-dropdown";
import { FeedbackHistoryState, OverallFeedbackState, Question } from "@/types/interview";
import { PROMPT } from "./prompts";


const NUM_QUESTIONS = 3

export default function Page() {
  const conversation = useConversation({
    onDisconnect: (disconnectionDetails)   => {
      console.log("disconnectionDetails", disconnectionDetails);
    },
    onConnect: (connectionDetails) => {
      console.log("connectionDetails", connectionDetails);
    },
    onError(message, context) {
      console.log("error", message, context);
    },
    onUnhandledClientToolCall(message) {
      console.log("unhandledClientToolCall", message);
    },
    onDebug(props) {
      console.log("debug", props);
    },
  });
  // permission state
  const [hasAudioAccess, setHasAudioAccess] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>("intermediate");
  const [topic, setTopic] = useState<string>("JavaScript");
  // session state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isEndingCall, setIsEndingCall] = useState(false);

  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackHistoryState[]>([]);
  
  const [overallFeedback, setOverallFeedback] = useState<OverallFeedbackState | null>(null);


  // language handling
  useEffect(() => {
    try {
      const stored = localStorage.getItem("preferredLanguage");
      if (stored && LANGUAGES.find(l => l.code === stored)) {
        setLanguage(stored);
        return;
      }

      console.log("navigator.language", navigator.language);
      if (navigator.language) {
        const browserLang = navigator.language.split("-")[0];
        const matchingLang = LANGUAGES.find(l => l.code === browserLang);
        if (matchingLang) {
          setLanguage(matchingLang.code);
          return;
        }
      }
    } catch (error) {
      console.warn("Language detection failed:", error);
    }
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);


  // refs
  const streamRef = useRef<MediaStream | null>(null);

  // audio stream handling
  const requestAudioPermissions = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      
      streamRef.current = stream;
      setHasAudioAccess(true);
      return stream;
    } catch (err) {
      console.error(err);
      toast.error("Please grant audio permissions in site settings to continue");
      setHasAudioAccess(false);
      return null;
    }
  };

  // call handling
  const startCall = async () => {
    try {
      const req = await getAgentSignedUrl({});
      const signedUrl = req?.data?.signedUrl;
      if (!signedUrl) {
        throw new Error("Failed to get signed URL");
      }
      conversation.startSession({
        signedUrl,
        overrides: {
          agent: {
            language: language ?? ("en" as any),
            firstMessage: LANGUAGES.find(l => l.code === language)?.firstSentence ??
            LANGUAGES[0].firstSentence,
            prompt: {
              prompt: PROMPT
            }
          },
        },
        dynamicVariables:{
          difficulty: difficulty,
          topic: topic,
          numQuestions: NUM_QUESTIONS
        },
        onConnect: ({ conversationId }) => {
          setConversationId(conversationId);
        },
        clientTools: {
          triggerName: async (parameters: { name: string }) => {
            setName(parameters.name);
            setIsCardOpen(true);
          },
          // New interview practice tools
          triggerQuestionAsked: async (parameters: {
            questionId: string;
            questionText: string;
          }) => {
            // TODO: Verify why this isn't being triggered
            console.log("triggerQuestionAsked", parameters);
            // Store the current question for feedback
            setFeedbackHistory(prev => [
              ...prev,
              {
                questionId: parameters.questionId,
                questionText: parameters.questionText,
                answer: "",
                feedback: "",
                score: 0,
                suggestions: []
              }
            ]);
          },
          triggerAnswerFeedback: async (parameters: {
            questionId: string;
            answer: string;
            feedback: string;
            score: number;
            suggestions: string[]
          }) => {

            // Add to the feedback history
            setFeedbackHistory(prev => {
              const lastQuestion = prev[prev.length - 1];
              return [
              ...prev.slice(0, prev.length - 1),
              {
                questionId: parameters.questionId,
                questionText: lastQuestion.questionText || "",
                answer: parameters.answer,
                feedback: parameters.feedback,
                score: parameters.score,
                suggestions: parameters.suggestions
              }
            ]
          });
          },
          triggerInterviewComplete: async (parameters: {
            overallScore: number;
            strengths: string[];
            areasForImprovement: string[];
            nextSteps: string[];
          }) => {
            // Store the overall interview feedback
            setOverallFeedback({
              score: parameters.overallScore,
              strengths: parameters.strengths,
              areasForImprovement: parameters.areasForImprovement,
              nextSteps: parameters.nextSteps
            });
            
            // Open the feedback card
            setIsCardOpen(true);
          },
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to start conversation.");
    }
  };

  const endCall = async () => {
    if (!conversationId) {
      toast.error("Conversation not found");
      return;
    }
    setIsEndingCall(true);

    try {
      // TODO: Save conversation to DB
      console.log(feedbackHistory)
      console.log(overallFeedback)
      // await saveConversationData({ conversationId, name, wishlist });
      await conversation.endSession();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      // TODO: Do a view with the interview feedback
      // redirect to the card page
      // router.push(`/cards/${conversationId}`, { scroll: false });
      setIsEndingCall(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save conversation.");
      setIsEndingCall(false); // Only reset loading state if there's an error
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Start Interview Button */}
      <div className="flex flex-col items-center justify-center min-h-screen md:min-h-screen pt-0 md:pt-16">
        {conversation.status !== "connected" && !isEndingCall && (
          <CallButton
            status={conversation.status}
            startCall={startCall}
            hasMediaAccess={hasAudioAccess}
            requestMediaPermissions={requestAudioPermissions}
            language={language}
            setLanguage={setLanguage}
            languages={LANGUAGES}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            topic={topic}
            setTopic={setTopic}
          />
        )}

        {/* In-Conversation View */}
        {conversation.status === "connected" && (
          <motion.div
            key="connected"
            className="relative flex items-center justify-center w-28 h-28 md:h-64 md:w-64 -mt-16 md:mt-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-[250px] max-h-[250px]">
                <Orb
                  colors={["#000000", "#DADADA"]}
                  getInputVolume={conversation.getInputVolume}
                  getOutputVolume={conversation.getOutputVolume}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-4 flex space-x-4">
          {conversation.status === "connected" && (
            <motion.div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/70 border-opacity-50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Image
                src="/assets/interviewer.png"
                alt="Interviewer"
                width={128}
                height={128}
                className="object-cover"
                sizes="128px"
              />
            </motion.div>
          )}
        </div>

        {isEndingCall && (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
              <span className="text-white">Finishing up...</span>
            </div>
          </div>
        )}

        {conversation.status === "connected" && !isEndingCall && (
          <div
            className={cn(
              "flex flex-col gap-3 mt-4",
              isCardOpen ? "invisible" : "visible"
            )}
          >
            <Button
              variant="default"
              className="px-4 py-2 rounded-full border-2 backdrop-blur-[16px] shadow-2xl"
              onClick={() => endCall()}
            >
              End
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 rounded-full  border-2 backdrop-blur-[16px] shadow-2xl"
              onClick={async () => {
                await endCall();
                window.location.reload();
              }}
            >
              Restart
            </Button>
          </div>
        )}
        {conversation.status === "connected" && (
          <InterviewCard
            conversation={conversation}

            isOpen={isCardOpen}
            setIsOpen={setIsCardOpen}
            name={name}
            feedbackHistory={feedbackHistory}
            overallFeedback={overallFeedback}
          />
        )}
      </div>
    </div>
  );
}
