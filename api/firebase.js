import { checkFirebaseConnection } from '../lib/firebase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const result = await checkFirebaseConnection();
  return res.status(result.ok ? 200 : 500).json(result);
}
