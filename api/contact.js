import { sendContactToTelegram } from '../lib/telegramContact.js';

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString('utf8');
  return body ? JSON.parse(body) : {};
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body;

  try {
    body = await readJsonBody(req);
  } catch (error) {
    console.error('Could not parse contact request body:', error);
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const result = await sendContactToTelegram(body);

  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json(result);
}
