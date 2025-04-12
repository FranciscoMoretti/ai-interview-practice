import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface InterviewFeedback {
  questionId: string;
  questionText: string;
  feedback: string;
  score: number;
  suggestions: string[];
}

interface OverallFeedback {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
}

interface InterviewCardProps {
  name: string;
  feedbackHistory: InterviewFeedback[];
  overallFeedback: OverallFeedback;
  onStartNewInterview: () => void;
}

export function InterviewCard({ name, feedbackHistory, overallFeedback, onStartNewInterview }: InterviewCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Interview Results for {name}</CardTitle>
        <CardDescription>{"Here's your interview feedback and recommendations"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
          <div className="flex items-center gap-4">
            <Progress value={overallFeedback.overallScore * 10} className="w-full" />
            <span className="text-2xl font-bold">{overallFeedback.overallScore}/10</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Key Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {overallFeedback.strengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Areas for Improvement</h3>
          <div className="flex flex-wrap gap-2">
            {overallFeedback.areasForImprovement.map((area, index) => (
              <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Recommended Next Steps</h3>
          <ul className="list-disc pl-5 space-y-1">
            {overallFeedback.nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Question-by-Question Feedback</h3>
          <div className="space-y-4">
            {feedbackHistory.map((feedback, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Question {index + 1}: {feedback.questionText}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={feedback.score * 10} className="w-full" />
                  <span className="font-bold">{feedback.score}/10</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{feedback.feedback}</p>
                <div>
                  <h5 className="text-sm font-medium mb-1">Suggestions:</h5>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {feedback.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartNewInterview} className="w-full">
          Start New Interview
        </Button>
      </CardFooter>
    </Card>
  );
} 