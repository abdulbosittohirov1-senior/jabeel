import 'dotenv/config';
import express from 'express';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '64kb' }));

app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

function clean(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function sendTelegramMessage(botToken, payload) {
  const body = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (response) => {
      let responseBody = '';

      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        responseBody += chunk;
      });
      response.on('end', () => {
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 300,
          statusCode: response.statusCode,
          body: responseBody,
        });
      });
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
}

app.post('/api/contact', async (req, res) => {
  const name = clean(req.body?.name);
  const phone = clean(req.body?.phone);
  const email = clean(req.body?.email);
  const message = clean(req.body?.message);
  const language = clean(req.body?.language);

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone and message are required.' });
  }

  const botToken = process.env.BOT_TOKEN;
  const managerChatId = process.env.MANAGER_CHAT_ID;

  if (!botToken || !managerChatId) {
    console.error('Set BOT_TOKEN and MANAGER_CHAT_ID in .env');
    return res.status(500).json({ error: 'Telegram is not configured.' });
  }

  const ticketId = `JB-${new Date().getFullYear().toString().slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const text = [
    '<b>Yangi murojaat</b>',
    '',
    `<b>ID:</b> ${escapeHtml(ticketId)}`,
    `<b>Ism:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    email ? `<b>Email:</b> ${escapeHtml(email)}` : null,
    language ? `<b>Til:</b> ${escapeHtml(language)}` : null,
    '',
    '<b>Xabar:</b>',
    escapeHtml(message),
  ].filter(Boolean).join('\n');

  try {
    const telegramResponse = await sendTelegramMessage(botToken, {
      chat_id: managerChatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });

    if (!telegramResponse.ok) {
      console.error('Telegram sendMessage failed:', telegramResponse.body);
      return res.status(502).json({ error: 'Could not send message to Telegram.' });
    }
  } catch (error) {
    console.error('Telegram request failed:', error);
    return res.status(502).json({ error: 'Could not send message to Telegram.' });
  }

  return res.json({ ok: true, ticketId });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`JABEEL website is running on http://localhost:${port}`);
});
