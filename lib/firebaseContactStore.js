import { FieldValue } from 'firebase-admin/firestore';
import { getFirebaseDb, getFirebaseStatus } from './firebase.js';

export function getContactStoreStatus(env = process.env) {
  return getFirebaseStatus(env);
}

export async function saveContactRequest(contact, options = {}, env = process.env) {
  const storeStatus = getContactStoreStatus(env);

  if (!storeStatus.firebaseConfigured) {
    return {
      ok: false,
      skipped: true,
      configured: false,
      error: 'Firebase is not configured.',
    };
  }

  try {
    const db = getFirebaseDb(env);
    const document = {
      ticketId: options.ticketId,
      name: contact.name,
      phone: contact.phone,
      email: contact.email || null,
      message: contact.message,
      language: contact.language || null,
      source: options.source || 'website-contact-form',
      status: 'new',
      telegramStatus: 'pending',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const ref = await db.collection(storeStatus.contactsCollection).add(document);

    return {
      ok: true,
      id: ref.id,
      provider: storeStatus.provider,
      collection: storeStatus.contactsCollection,
    };
  } catch (error) {
    console.error('Could not save contact request to Firebase:', error);

    return {
      ok: false,
      configured: true,
      status: 502,
      error: 'Could not save contact request to Firebase.',
    };
  }
}

export async function updateContactTelegramStatus(documentId, telegramStatus, env = process.env, errorMessage = '') {
  const storeStatus = getContactStoreStatus(env);

  if (!storeStatus.firebaseConfigured || !documentId) {
    return { ok: false, skipped: true };
  }

  try {
    const db = getFirebaseDb(env);
    const update = {
      telegramStatus,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (errorMessage) {
      update.telegramError = String(errorMessage).slice(0, 500);
    }

    await db.collection(storeStatus.contactsCollection).doc(documentId).set(update, { merge: true });

    return { ok: true };
  } catch (error) {
    console.error('Could not update contact Telegram status in Firebase:', error);
    return { ok: false, error: 'Could not update contact Telegram status.' };
  }
}
