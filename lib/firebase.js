import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'node:fs';
import path from 'node:path';

const APP_NAME = 'jabeel-contact-backend';

function clean(value, maxLength = 10_000) {
  return String(value || '').trim().slice(0, maxLength);
}

function parseServiceAccountJson(value) {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function getServiceAccountFromEnv(env = process.env) {
  const inlineJson = parseServiceAccountJson(clean(env.FIREBASE_SERVICE_ACCOUNT_JSON, 100_000));

  if (inlineJson) {
    return inlineJson;
  }

  const projectId = clean(env.FIREBASE_PROJECT_ID);
  const clientEmail = clean(env.FIREBASE_CLIENT_EMAIL);
  const privateKey = clean(env.FIREBASE_PRIVATE_KEY, 10_000).replaceAll('\\n', '\n');

  if (projectId && clientEmail && privateKey) {
    return {
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    };
  }

  return null;
}

function getServiceAccountFromFile(env = process.env) {
  const configuredPath = clean(env.FIREBASE_SERVICE_ACCOUNT_PATH || env.GOOGLE_APPLICATION_CREDENTIALS);
  const credentialPath = configuredPath || path.resolve(process.cwd(), 'firebase-service-account.json');

  if (!fs.existsSync(credentialPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(credentialPath, 'utf8'));
  } catch (error) {
    console.error('Could not read Firebase service account file:', error);
    return null;
  }
}

export function getFirebaseConfig(env = process.env) {
  const serviceAccount = getServiceAccountFromEnv(env) || getServiceAccountFromFile(env);
  const projectId = clean(env.FIREBASE_PROJECT_ID || serviceAccount?.project_id);

  return {
    contactsCollection: clean(env.FIREBASE_CONTACTS_COLLECTION) || 'contacts',
    firebaseConfigured: Boolean(serviceAccount && projectId),
    projectId: projectId || null,
    serviceAccount,
  };
}

export function getFirebaseStatus(env = process.env) {
  const config = getFirebaseConfig(env);

  return {
    provider: 'firebase-firestore',
    firebaseConfigured: config.firebaseConfigured,
    projectId: config.projectId,
    contactsCollection: config.contactsCollection,
  };
}

export function getFirebaseDb(env = process.env) {
  const config = getFirebaseConfig(env);

  if (!config.firebaseConfigured) {
    throw new Error('Firebase is not configured.');
  }

  const existingApp = getApps().find((app) => app.name === APP_NAME);
  const app = existingApp || initializeApp({
    credential: cert(config.serviceAccount),
    projectId: config.projectId,
  }, APP_NAME);

  return getFirestore(app);
}

export async function checkFirebaseConnection(env = process.env) {
  const status = getFirebaseStatus(env);

  if (!status.firebaseConfigured) {
    return {
      ok: false,
      ...status,
      error: 'Firebase is not configured.',
    };
  }

  try {
    const db = getFirebaseDb(env);

    await db.listCollections();

    return {
      ok: true,
      ...status,
    };
  } catch (error) {
    console.error('Firebase connection failed:', error);

    return {
      ok: false,
      ...status,
      error: 'Could not connect to Firebase.',
    };
  }
}
