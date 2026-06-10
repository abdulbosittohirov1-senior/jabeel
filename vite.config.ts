import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import { getContactStatusPayload, submitContactRequest } from './lib/contactApi.js';

function readJsonBody(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      body += chunk;

      if (body.length > 64 * 1024) {
        reject(new Error('Request body is too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function telegramContactDevApi(env: Record<string, string | undefined>): Plugin {
  return {
    name: 'telegram-contact-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        res.setHeader('Cache-Control', 'no-store');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method === 'GET') {
          sendJson(res, 200, getContactStatusPayload(env));
          return;
        }

        if (req.method !== 'POST') {
          res.setHeader('Allow', 'GET, POST');
          sendJson(res, 405, { error: 'Method not allowed.' });
          return;
        }

        let body;

        try {
          body = await readJsonBody(req);
        } catch (error) {
          console.error('Could not parse contact request body:', error);
          sendJson(res, 400, { error: 'Invalid JSON body.' });
          return;
        }

        const result = await submitContactRequest(body, env);

        if (!result.ok) {
          sendJson(res, result.status, { error: result.error });
          return;
        }

        sendJson(res, 200, result);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ''),
  };

  return {
    plugins: [react(), tailwindcss(), telegramContactDevApi(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
