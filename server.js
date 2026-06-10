import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getContactStatusPayload, submitContactRequest } from './lib/contactApi.js';
import { checkFirebaseConnection } from './lib/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
const contactAttempts = new Map();
const contactRateLimitWindowMs = 60_000;
const contactRateLimitMax = 10;

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', (_req, res) => {
  return res.sendStatus(204);
});

function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function contactRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const recentAttempts = (contactAttempts.get(key) || []).filter(
    (timestamp) => now - timestamp < contactRateLimitWindowMs,
  );

  if (recentAttempts.length >= contactRateLimitMax) {
    return res.status(429).json({ error: 'Too many contact requests. Please try again later.' });
  }

  recentAttempts.push(now);
  contactAttempts.set(key, recentAttempts);
  return next();
}

app.get('/api/health', (_req, res) => {
  return res.json({
    ok: true,
    service: 'jabeel-backend',
    uptime: Math.round(process.uptime()),
    contact: getContactStatusPayload(),
  });
});

app.get('/api/contact', (_req, res) => {
  return res.json(getContactStatusPayload());
});

app.get('/api/firebase', asyncRoute(async (_req, res) => {
  const result = await checkFirebaseConnection();
  return res.status(result.ok ? 200 : 500).json(result);
}));

app.post('/api/contact', contactRateLimit, asyncRoute(async (req, res) => {
  const result = await submitContactRequest(req.body);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.json(result);
}));

app.use('/api', (_req, res) => {
  return res.status(404).json({ error: 'API route not found.' });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (error) => {
    if (error && !res.headersSent) {
      res.status(404).json({ error: 'Frontend build not found. Run npm run build first.' });
    }
  });
});

app.use((error, req, res, _next) => {
  console.error('Backend error:', error);

  if (res.headersSent) {
    return;
  }

  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large.' });
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  return res.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, () => {
  console.log(`JABEEL backend is running on http://localhost:${port}`);
});
