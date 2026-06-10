# Vercel Telegram Form Setup

Live site: `https://jabeel.vercel.app`

The contact API route exists at:

```text
/api/contact
```

If the form does not send Telegram messages, open:

```text
https://jabeel.vercel.app/api/contact
```

To check Firebase connection, open:

```text
https://jabeel.vercel.app/api/firebase
```

Good result should show:

```json
{
  "ok": true,
  "botTokenConfigured": true,
  "managerChatIdConfigured": true
}
```

## Add Environment Variables In Vercel

1. Open Vercel Dashboard.
2. Open your `jabeel` project.
3. Go to `Settings`.
4. Open `Environment Variables`.
5. Add:

```env
BOT_TOKEN=your_botfather_token
MANAGER_CHAT_ID=your_telegram_chat_id
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_client_email
FIREBASE_PRIVATE_KEY=your_service_account_private_key
FIREBASE_CONTACTS_COLLECTION=contacts
```

6. Select all environments: `Production`, `Preview`, and `Development`.
7. Save.
8. Redeploy the latest deployment.

After redeploy, submit the contact form again.

Important: the bot can send a private message only after you open the bot in Telegram and press `/start`.
