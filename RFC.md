# RFC: AI Interview Practice Platform

## Overview
A web application that helps software developers practice for technical interviews through AI-powered mock interviews with real-time feedback.

## Goals
- Provide realistic interview practice for software developers
- Deliver immediate, actionable feedback
- Support multiple programming languages and difficulty levels
- Enable personalized learning paths
- Scale efficiently using serverless architecture

## Technical Architecture

### Frontend (React + TypeScript)
1. **Core Components**
   - AuthProvider - Handle user authentication state
   - InterviewSession - Manage interview flow and state
   - QuestionDisplay - Render current question
   - FeedbackPanel - Display AI feedback (with client tool calling)
   - LanguageSelector - Choose programming language
   - DifficultySelector - Set interview difficulty

2. **State Management**
   - Local state for interview session


3. **External Integrations**
   - Elevenlabs conversation API for conversations
   - PostgreSQL for data storage

## User Flow
1. Selects:
   - Interview language
   - Difficulty level
2. Interview starts:
   - AI asks questions
   - User provides answers
   - Real-time feedback after each answer
3. Session ends:
   - Option to download feedback

## Subscription Model (TBD Later)
- Pay-per-interview or monthly subscription
- Credit-based system
- Automatic renewal option
- Usage analytics for users


## Development Phases

### Phase 1 - MVP
- Simple interview flow
- Core question types
- Basic feedback
- MVP UI

### Phase 2 - Enhancement
- Basic auth (LATER)
- Advanced question types
- Improved AI feedback
- UI/UX improvements
