<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5b369392-d3b0-4db7-bc01-1e0dac2a3f87

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Backend

The backend is an Express API in [server.js](server.js).

Required `.env` values:

```env
BOT_TOKEN="your_telegram_bot_token"
MANAGER_CHAT_ID="your_telegram_chat_id"
FIREBASE_SERVICE_ACCOUNT_PATH="./firebase-service-account.json"
FIREBASE_CONTACTS_COLLECTION="contacts"
```

Useful endpoints:

```text
GET  /api/health
GET  /api/contact
GET  /api/firebase
POST /api/contact
```

`POST /api/contact` saves contact requests to Firebase Firestore when configured, then sends them to Telegram.

For local Firebase setup, download a Firebase service account JSON file and save it as:

```text
firebase-service-account.json
```

Run the built site with backend:

```bash
npm run form
```
