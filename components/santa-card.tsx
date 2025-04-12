"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Download, RefreshCw, AudioLines } from "lucide-react";
import { downloadFeedbackAsMarkdown } from "@/lib/download-feedback";
import { FeedbackItem, OverallFeedback } from "@/types/interview";

interface InterviewCardProps {
  name: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  conversation: any;
  endCall: (withVideo?: boolean) => void;
  feedbackHistory: FeedbackItem[];
  overallFeedback: OverallFeedback | null;
}

export function InterviewCard({
  isOpen,
  setIsOpen,
  name,
  conversation,
  endCall,
  feedbackHistory,
  overallFeedback,
}: InterviewCardProps) {
  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-8 -translate-x-1/2 z-10"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="text-white font-bold px-10 py-5 rounded-full border-blue-500 border-2 bg-blue-900/90 hover:bg-white/5 backdrop-blur-[16px] shadow-2xl"
              variant="default"
              size="lg"
            >
              <Mail />
              <span className="hidden sm:inline">
                View Interview Feedback
              </span>
              <span className="sm:hidden">View Feedback</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className={cn("mx-auto max-w-2xl px-6")}
        >
          <div className="container mx-auto flex flex-col items-stretch gap-4 px-6">
            <DrawerHeader>
              <DrawerTitle className="text-2xl font-bold text-blue-600 text-center">
                {name ? `${name}'s Interview Feedback` : "Interview Feedback"}k
              </DrawerTitle>
              <hr className="border-t-2 border-blue-300 my-2 opacity-20" />
            </DrawerHeader>
            {overallFeedback ?(
              <div className="max-w-2xl mx-auto bg-white rounded-lg mb-6 ">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Overall Performance</h2>
                    <div className="text-3xl font-bold text-blue-600">
                      {overallFeedback.score}/10
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Strengths</h3>
                      <ul className="space-y-2">
                        {overallFeedback.strengths.map((strength, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              ease: "easeOut",
                              delay: 0.1 + index * 0.1,
                            }}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{strength}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-red-600 mb-2">Areas for Improvement</h3>
                      <ul className="space-y-2">
                        {overallFeedback.areasForImprovement.map((area, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              ease: "easeOut",
                              delay: 0.1 + index * 0.1,
                            }}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span className="text-red-500 mt-1">!</span>
                            <span>{area}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Next Steps</h3>
                    <ul className="space-y-2">
                      {overallFeedback.nextSteps.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.1 + index * 0.1,
                          }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-blue-500 mt-1">→</span>
                          <span>{step}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ):
            (
            <div className="max-w-2xl mx-auto bg-white rounded-lg w-full">
              
              {feedbackHistory.length === 0 ? (
                <p className="text-gray-500 italic">No feedback available yet. Complete the interview to see your feedback.</p>
              ) : (
                <div className="space-y-6">
                  {feedbackHistory.slice(-1).map((item, index) => (
                    <motion.div
                      key={item.questionId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.1,
                      }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">Question {feedbackHistory.length - index} : {item.questionText}</h3>
                        <div className="text-lg font-bold text-blue-600">
                          {item.score}/10
                        </div>
                      </div>
                      
                        <h4 className="text-md font-semibold text-gray-700 mb-1">Answer</h4>
                      <div className="bg-gray-50 p-3 rounded-md mb-3"> 
                        <p className="text-gray-700">{item.answer}</p>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-md font-semibold text-gray-700 mb-1">Feedback</h4>
                        <p className="text-gray-600">{item.feedback}</p>
                      </div>
                      
                      {item.suggestions.length > 0 && (
                        <div>
                          <h4 className="text-md font-semibold text-gray-700 mb-1">Suggestions</h4>
                          <ul className="list-disc pl-5 space-y-1">

                            {item.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-gray-600">{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            )}
            
            <DrawerFooter className="flex justify-between border-t pt-6">
              <span className="text-gray-500">
                Made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by{" "}
                <strong>
                  <a href="https://github.com/franciscoMoretti" target="_blank">
                    Francisco Moretti
                  </a>
                </strong>
              </span>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  variant="default"
                  className="flex-1 px-4 py-2 rounded-full border-gray-500 border-2 bg-gray-900/90 hover:bg-gray-950/90 text-white backdrop-blur-[16px] shadow-2xl"
                  onClick={async () => {
                    setIsOpen(false);
                    await conversation.endSession();
                    window.location.reload();
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
                <Button
                  variant="default"
                  className="flex-1 px-4 py-2 rounded-full border-blue-500 border-2 bg-blue-900/90 hover:bg-blue-950/90 text-white backdrop-blur-[16px] shadow-2xl"
                  onClick={() => {
                    setIsOpen(false);
                    endCall(false);
                  }}
                >
                  Save Audio
                  <AudioLines className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="default"
                  className="flex-1 px-4 py-2 rounded-full border-purple-500 border-2 bg-purple-900/90 hover:bg-purple-950/90 text-white backdrop-blur-[16px] shadow-2xl"
                  onClick={() => {
                    downloadFeedbackAsMarkdown(name, overallFeedback, feedbackHistory);
                  }}
                >
                  Download Feedback
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
