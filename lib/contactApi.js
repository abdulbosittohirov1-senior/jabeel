import { getContactStoreStatus, saveContactRequest, updateContactTelegramStatus } from './firebaseContactStore.js';
import {
  createContactTicketId,
  getTelegramContactStatus,
  normalizeContactRequest,
  sendContactToTelegram,
} from './telegramContact.js';

export const CONTACT_API_VERSION = '2026-06-10-contact-firebase-fallback';

export function getContactStatusPayload(env = process.env) {
  const telegram = getTelegramContactStatus(env);
  const storage = getContactStoreStatus(env);

  return {
    ok: telegram.botTokenConfigured && telegram.managerChatIdConfigured,
    service: 'jabeel-contact-backend',
    version: CONTACT_API_VERSION,
    route: 'contact',
    telegram,
    storage,
  };
}

export async function submitContactRequest(body, env = process.env) {
  const normalized = normalizeContactRequest(body);

  if (!normalized.ok) {
    return normalized;
  }

  const ticketId = createContactTicketId();
  const savedContact = await saveContactRequest(normalized.contact, { ticketId }, env);

  if (!savedContact.ok && savedContact.configured) {
    console.error(savedContact.error);
  }

  const telegram = getTelegramContactStatus(env);

  if (!telegram.botTokenConfigured || !telegram.managerChatIdConfigured) {
    if (savedContact.ok) {
      await updateContactTelegramStatus(savedContact.id, 'skipped', env, 'Telegram is not configured.');

      return {
        ok: true,
        ticketId,
        savedToFirebase: true,
        firebaseId: savedContact.id,
        telegramSent: false,
        warning: 'Telegram is not configured.',
      };
    }

    return {
      ok: false,
      status: 500,
      error: 'Telegram is not configured.',
    };
  }

  const telegramResult = await sendContactToTelegram(normalized.contact, env, {
    contact: normalized.contact,
    ticketId,
  });

  if (!telegramResult.ok) {
    await updateContactTelegramStatus(savedContact.id, 'failed', env, telegramResult.error);

    if (savedContact.ok) {
      return {
        ok: true,
        ticketId,
        savedToFirebase: true,
        firebaseId: savedContact.id,
        telegramSent: false,
        warning: telegramResult.error,
      };
    }

    return telegramResult;
  }

  await updateContactTelegramStatus(savedContact.id, 'sent', env);

  return {
    ok: true,
    ticketId,
    savedToFirebase: savedContact.ok,
    firebaseId: savedContact.id || null,
    telegramSent: true,
  };
}
