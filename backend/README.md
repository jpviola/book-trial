# Soft Skills Book Backend

Node.js + Express + Supabase API for newsletter subscriptions and reader feedback.

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with Supabase credentials
3. Run: `npm run dev`

## API Endpoints

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/confirm/:email` - Confirm subscription
- `GET /api/newsletter/count` - Get subscriber count

### Feedback
- `POST /api/feedback/submit` - Submit chapter feedback
- `GET /api/feedback/chapter/:id` - Get feedback for chapter
- `GET /api/feedback/stats` - Get total feedback count