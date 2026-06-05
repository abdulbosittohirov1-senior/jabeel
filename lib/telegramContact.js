import https from 'node:https';

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

export async function sendContactToTelegram(data, env = process.env) {
  const name = clean(data?.name);
  const phone = clean(data?.phone);
  const email = clean(data?.email);
  const message = clean(data?.message);
  const language = clean(data?.language);

  if (!name || !phone || !message) {
    return {
      ok: false,
      status: 400,
      error: 'Name, phone and message are required.',
    };
  }

  const botToken = env.BOT_TOKEN;
  const managerChatId = env.MANAGER_CHAT_ID;

  if (!botToken || !managerChatId) {
    console.error('Set BOT_TOKEN and MANAGER_CHAT_ID in environment variables');
    return {
      ok: false,
      status: 500,
      error: 'Telegram is not configured.',
    };
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
      return {
        ok: false,
        status: 502,
        error: 'Could not send message to Telegram.',
      };
    }
  } catch (error) {
    console.error('Telegram request failed:', error);
    return {
      ok: false,
      status: 502,
      error: 'Could not send message to Telegram.',
    };
  }

  return { ok: true, ticketId };
}

export function getTelegramContactStatus(env = process.env) {
  return {
    route: 'contact',
    botTokenConfigured: Boolean(env.BOT_TOKEN),
    managerChatIdConfigured: Boolean(env.MANAGER_CHAT_ID),
  };
}
