import https from 'node:https';

function clean(value, maxLength = 2000) {
  return String(value || '').trim().slice(0, maxLength);
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

function getTelegramChat(botToken, chatId) {
  return new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${botToken}/getChat?chat_id=${encodeURIComponent(chatId)}`,
      method: 'GET',
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
    request.end();
  });
}

function getTelegramErrorMessage(responseBody) {
  try {
    const parsed = JSON.parse(responseBody);

    if (parsed?.description) {
      return `Telegram error: ${parsed.description}`;
    }
  } catch {
    // Telegram usually returns JSON, but keep a safe fallback for plain text.
  }

  return 'Could not send message to Telegram.';
}

function isPrivateTelegramChatId(chatId) {
  return /^\d+$/.test(clean(chatId, 80));
}

function cleanTelegramUsername(username) {
  return clean(username, 80).replace(/^@/, '').toLowerCase();
}

function getAllowedManagerUsername(env) {
  return cleanTelegramUsername(env.MANAGER_TELEGRAM_USERNAME || 'Bosit00007');
}

async function verifyTelegramManagerChat(botToken, managerChatId, allowedUsername) {
  const chatResponse = await getTelegramChat(botToken, managerChatId);

  if (!chatResponse.ok) {
    return {
      ok: false,
      error: getTelegramErrorMessage(chatResponse.body),
    };
  }

  try {
    const parsed = JSON.parse(chatResponse.body);
    const chat = parsed?.result;
    const chatUsername = cleanTelegramUsername(chat?.username);

    if (chat?.type !== 'private' || chatUsername !== allowedUsername) {
      return {
        ok: false,
        error: 'Telegram manager chat is not the allowed private user.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Could not verify Telegram manager chat.',
    };
  }
}

export function normalizeContactRequest(data) {
  const name = clean(data?.name, 100);
  const phone = clean(data?.phone, 60);
  const email = clean(data?.email, 120);
  const message = clean(data?.message, 2000);
  const language = clean(data?.language, 20);

  if (!name || !phone || !message) {
    return {
      ok: false,
      status: 400,
      error: 'Name, phone and message are required.',
    };
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      status: 400,
      error: 'Email address is invalid.',
    };
  }

  return {
    ok: true,
    contact: {
      name,
      phone,
      email,
      message,
      language,
    },
  };
}

export function createContactTicketId() {
  return `JB-${new Date().getFullYear().toString().slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function sendContactToTelegram(data, env = process.env, options = {}) {
  const normalized = options.contact
    ? { ok: true, contact: options.contact }
    : normalizeContactRequest(data);

  if (!normalized.ok) {
    return normalized;
  }

  const {
    name,
    phone,
    email,
    message,
    language,
  } = normalized.contact;
  const botToken = env.BOT_TOKEN;
  const managerChatId = env.MANAGER_CHAT_ID;
  const allowedManagerUsername = getAllowedManagerUsername(env);

  if (!botToken || !managerChatId) {
    console.error('Set BOT_TOKEN and MANAGER_CHAT_ID in environment variables');
    return {
      ok: false,
      status: 500,
      error: 'Telegram is not configured.',
    };
  }

  if (!allowedManagerUsername) {
    console.error('MANAGER_TELEGRAM_USERNAME must be configured for contact privacy');
    return {
      ok: false,
      status: 500,
      error: 'Telegram manager username is not configured.',
    };
  }

  if (!isPrivateTelegramChatId(managerChatId)) {
    console.error('MANAGER_CHAT_ID must be a private Telegram user chat ID for contact privacy');
    return {
      ok: false,
      status: 500,
      error: 'Telegram manager chat must be a private user chat ID.',
    };
  }

  const managerVerification = await verifyTelegramManagerChat(botToken, managerChatId, allowedManagerUsername);

  if (!managerVerification.ok) {
    console.error('Telegram manager chat verification failed:', managerVerification.error);
    return {
      ok: false,
      status: 500,
      error: managerVerification.error,
    };
  }

  const ticketId = options.ticketId || createContactTicketId();
  const submittedAt = new Intl.DateTimeFormat('uz-UZ', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Tashkent',
  }).format(new Date());
  const text = [
    '<b>Yangi murojaat</b>',
    '',
    `<b>ID:</b> ${escapeHtml(ticketId)}`,
    `<b>Sana:</b> ${escapeHtml(submittedAt)}`,
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
        error: getTelegramErrorMessage(telegramResponse.body),
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
  const managerChatId = env.MANAGER_CHAT_ID;
  const allowedManagerUsername = getAllowedManagerUsername(env);

  return {
    route: 'contact',
    botTokenConfigured: Boolean(env.BOT_TOKEN),
    managerChatIdConfigured: Boolean(managerChatId),
    privateManagerChatConfigured: isPrivateTelegramChatId(managerChatId),
    allowedManagerUsernameConfigured: Boolean(allowedManagerUsername),
  };
}
