# 🎯 AI Interview Practice Platform

[ai-interview-practice.io](https://ai-interview-practice.io) is an AI-powered interview practice platform built with our [Conversational AI SDK](https://www.npmjs.com/package/@11labs/react).

## Prerequisites

- Node.js 16 or higher
- pnpm installed globally
- An [ElevenLabs](https://elevenlabs.io) account
- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) account

## Setting up the Agent

1. Set-up a Conversational AI agent in ElevenLabs [Guide](https://elevenlabs.io/docs/conversational-ai/docs/agent-setup).
2. Enable overrides in agent Settings => Security => Enable overrides.
3. Configure the agent with the following System Prompt and first message:

```
System Prompt:

You are an experienced technical interviewer for {{topic}} positions. Your role is to conduct realistic technical interviews, provide immediate feedback, and help candidates improve their interview skills.

When speaking to someone, keep your tone professional but friendly. Make it your top priority to ask for their name to personalize the experience. Once you have their name, explain the interview process.

Conduct the interview by asking relevant technical questions based on {{topic}} at a {{difficulty}} level. You must ask exactly {{numQuestions}} questions. After each answer, provide constructive feedback on their response, including:
- What they did well
- What could be improved
- Specific suggestions for better answers

Score each answer on a scale of 1-10 and explain your scoring.

At the end of the interview, provide an overall assessment including:
- Overall score
- Key strengths
- Areas for improvement
- Recommended next steps for preparation

You must call the triggerName function when the user tells you their name.
You must call the triggerQuestionAsked function when you ask a new question.
You must call the triggerAnswerFeedback when the user answers a question.
You must call the triggerInterviewComplete function when providing the final assessment.
```

```
First Message:
Hello! I'm your AI interview coach. I'll be conducting your {{topic}} interview today. What's your name?
```

4. Add the following client-tools:

   1. name: `triggerName`

   - Description: When the person tells you their name, call this function to store in memory.
   - Parameter 1:
     1. Data type: String
     2. Identifier: name
     3. Description: The name of the user.

   2. name: `triggerQuestionAsked`

   - Description: When you ask a new interview question, call this function.
   - Parameter 1:
     1. Data type: String
     2. Identifier: questionId
     3. Description: A unique identifier for the question (e.g., "js_closure_1").
   - Parameter 2:
     1. Data type: String
     2. Identifier: questionText
     3. Description: The full text of the question being asked.

   3. name: `triggerAnswerFeedback`

   - Description: After getting an answer from the user, call this function.
   - Parameter 1:
     1. Data type: String
     2. Identifier: questionId
     3. Description: The ID of the question being answered.
   - Parameter 2:
     1. Data type: String
     2. Identifier: answer
     3. Description: The answer provided by the user.
   - Parameter 3:
     1. Data type: String
     2. Identifier: feedback
     3. Description: Your detailed feedback on the answer.
   - Parameter 4:
     1. Data type: Number
     2. Identifier: score
     3. Description: A score from 1-10 for the answer.
   - Parameter 5:
     1. Data type: Array
     2. Identifier: suggestions
     3. Description: Specific suggestions for improving the answer.
     4. Array items:
        - Data type: String
        - Description: A suggestion for improving the answer.

   4. name: `triggerInterviewComplete`

   - Description: When providing the final assessment, call this function.
   - Parameter 1:
     1. Data type: Number
     2. Identifier: overallScore
     3. Description: The overall interview score (1-10).
   - Parameter 2:
     1. Data type: Array
     2. Identifier: strengths
     3. Description: Key strengths demonstrated during the interview.
     4. Array items:
        - Data type: String
        - Description: A strength demonstrated by the candidate.
   - Parameter 3:
     1. Data type: Array
     2. Identifier: areasForImprovement
     3. Description: Areas where the candidate needs improvement.
     4. Array items:
        - Data type: String
        - Description: An area where the candidate needs improvement.
   - Parameter 4:
     1. Data type: Array
     2. Identifier: nextSteps
     3. Description: Recommended next steps for preparation.
     4. Array items:
        - Data type: String
        - Description: A recommended next step for preparation.

## Setting up the Infrastructure

1. Create a new project in Vercel & connect a Supabase database to it (storage tab)
2. Once the database is connected, create a new table called `public.interviews`:

```sql
CREATE TABLE public.interviews (
  id text NOT NULL,
  name text NULL,
  feedback_history jsonb NULL,
  overall_feedback jsonb NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT interviews_pkey PRIMARY KEY (id)
);
```

3. Create a new storage bucket called `media` with an empty folder called `media`

## Setting up the Project

1. `pnpm install`
2. `cp .env.example .env` (Recommended: add the `AGENT_ID` & `XI_API_KEY` to Vercel and pull them using vercel env pull)
3. `pnpm run dev`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 