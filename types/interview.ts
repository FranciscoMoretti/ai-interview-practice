export interface FeedbackItem {
  questionId: string;
  questionText: string;
  answer: string;
  feedback: string;
  score: number;
  suggestions: string[];
}

export interface OverallFeedback {
  score: number;
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
}

export interface Question {
  questionId: string;
  questionText: string;
  answer: string;
}

export interface FeedbackHistoryState {
  questionId: string;
  questionText: string;
  answer: string;
  feedback: string;
  score: number;
  suggestions: string[];
}

export interface OverallFeedbackState {
  score: number;
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
} 