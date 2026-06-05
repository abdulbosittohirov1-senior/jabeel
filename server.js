import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getTelegramContactStatus, sendContactToTelegram } from './lib/telegramContact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '64kb' }));

app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.get('/api/contact', (_req, res) => {
  const status = getTelegramContactStatus();

  return res.json({
    ok: status.botTokenConfigured && status.managerChatIdConfigured,
    version: '2026-06-05-force-vercel-contact',
    ...status,
  });
});

app.post('/api/contact', async (req, res) => {
  const result = await sendContactToTelegram(req.body);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.json(result);
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`JABEEL website is running on http://localhost:${port}`);
});
