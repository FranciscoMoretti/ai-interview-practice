import { FeedbackItem, OverallFeedback } from "@/types/interview";

export function downloadFeedbackAsMarkdown(
  name: string | null,
  overallFeedback: OverallFeedback | null,
  feedbackHistory: FeedbackItem[]
): void {
  // Create markdown content
  let markdownContent = `# Interview Feedback${name ? ` for ${name}` : ''}\n\n`;
  
  // Add overall feedback section if available
  if (overallFeedback) {
    markdownContent += `## Overall Performance: ${overallFeedback.score}/10\n\n`;
    
    // Add strengths
    markdownContent += `### Strengths\n\n`;
    overallFeedback.strengths.forEach((strength: string) => {
      markdownContent += `- ${strength}\n`;
    });
    markdownContent += '\n';
    
    // Add areas for improvement
    markdownContent += `### Areas for Improvement\n\n`;
    overallFeedback.areasForImprovement.forEach((area: string) => {
      markdownContent += `- ${area}\n`;
    });
    markdownContent += '\n';
    
    // Add next steps
    markdownContent += `### Next Steps\n\n`;
    overallFeedback.nextSteps.forEach((step: string) => {
      markdownContent += `- ${step}\n`;
    });
    markdownContent += '\n';
  }
  
  // Add detailed feedback history
  markdownContent += `## Detailed Feedback\n\n`;
  
  if (feedbackHistory.length === 0) {
    markdownContent += `*No feedback available yet. Complete the interview to see your feedback.*\n`;
  } else {
    feedbackHistory.forEach((item, index) => {
      markdownContent += `### Question ${index + 1}: ${item.questionText}\n\n`;
      markdownContent += `**Score:** ${item.score}/10\n\n`;
      
      markdownContent += `**Your Answer:**\n\n${item.answer}\n\n`;
      
      markdownContent += `**Feedback:**\n\n${item.feedback}\n\n`;
      
      if (item.suggestions.length > 0) {
        markdownContent += `**Suggestions:**\n\n`;
        item.suggestions.forEach((suggestion: string) => {
          markdownContent += `- ${suggestion}\n`;
        });
        markdownContent += '\n';
      }
      
      markdownContent += '---\n\n';
    });
  }
  
  // Add timestamp
  markdownContent += `\n\n*Generated on: ${new Date().toLocaleString()}*`;
  
  // Create and download the file
  const dataBlob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `interview-feedback-${name || 'anonymous'}-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
} 