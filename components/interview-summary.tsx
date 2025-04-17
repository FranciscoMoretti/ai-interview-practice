"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";
import { downloadFeedbackAsMarkdown } from "@/lib/download-feedback";
import { FeedbackItem, OverallFeedback } from "@/types/interview";

interface InterviewSummaryProps {
  name: string | null;
  conversation: any; // Keeping conversation prop if needed for restart logic
  feedbackHistory: FeedbackItem[];
  overallFeedback: OverallFeedback | null;
}

export function InterviewSummary({
  name,
  conversation,
  feedbackHistory,
  overallFeedback,
}: InterviewSummaryProps) {
  return (
    <div className={cn("mx-auto max-w-2xl px-6 py-8")}>
      <div className="container mx-auto flex flex-col items-stretch gap-6 px-6">
        <header className="pb-0">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
            {name ? `${name}'s Interview Feedback` : "Interview Feedback"}
          </h1>
          <hr className="border-t-2 border-blue-300 my-2 opacity-20" />
        </header>

        {/* Overall Feedback Section */}
        {overallFeedback && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg mb-6 w-full border border-gray-200 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
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
                        key={`strength-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.1 + index * 0.1,
                        }}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="text-green-500">✓</span>
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
                         key={`improvement-${index}`}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{
                           duration: 0.5,
                           ease: "easeOut",
                           delay: 0.1 + index * 0.1,
                         }}
                         className="flex items-start gap-2 text-gray-700"
                       >
                         <span className="text-red-500">!</span>
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
                      key={`nextstep-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.1,
                      }}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500">→</span>
                      <span>{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Feedback Section */}
        {feedbackHistory.length > 0 ? (
            <>
                <h2 className="text-2xl font-bold text-gray-800 text-center mt-8 mb-4">Detailed Feedback</h2>
                <div className="space-y-6">
                {feedbackHistory.map((item, index) => (
                    <motion.div
                    key={item.questionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.1,
                    }}
                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                    >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}: {item.questionText}</h3>
                        <div className="text-lg font-bold text-blue-600 ml-4 shrink-0">
                        {item.score}/10
                        </div>
                    </div>

                    <h4 className="text-md font-semibold text-gray-700 mb-1">Your Answer</h4>
                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                        <p className="text-gray-700 whitespace-pre-wrap">{item.answer}</p>
                    </div>

                    <div className="mb-3">
                        <h4 className="text-md font-semibold text-gray-700 mb-1">Feedback</h4>
                        <p className="text-gray-600">{item.feedback}</p>
                    </div>

                    {item.suggestions && item.suggestions.length > 0 && (
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
            </>
        ) : (
           !overallFeedback && (
            <div className="max-w-2xl mx-auto bg-white rounded-lg w-full p-6 text-center">
              <p className="text-gray-500 italic">No feedback available yet. Complete the interview to see your feedback.</p>
            </div>
           )
        )}

        {/* Footer with Buttons */}
        <footer className="flex flex-col justify-between items-center gap-3 pt-8 pb-4 mt-4 border-t border-gray-200">

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 px-6 py-2 rounded-full border-gray-500 border text-gray-700 hover:bg-gray-100 shadow-sm"
              onClick={async () => {
                if (conversation) {
                  await conversation.endSession();
                }
                window.location.reload(); // Consider routing instead of reload if applicable
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Start New Interview
            </Button>
            <Button
              variant="default"
              className="flex-1 px-6 py-2 rounded-full border-purple-500 border bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
              onClick={() => {
                downloadFeedbackAsMarkdown(name, overallFeedback, feedbackHistory);
              }}
              disabled={!overallFeedback && feedbackHistory.length === 0}
            >
              Download Feedback
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <span className="text-gray-500 text-sm mb-4 sm:mb-0">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by{" "}
            <strong>
              <a href="https://github.com/franciscoMoretti" target="_blank" className="text-blue-600 hover:underline">
                Francisco Moretti
              </a>
            </strong>
          </span>
        </footer>
      </div>
    </div>
  );
} 