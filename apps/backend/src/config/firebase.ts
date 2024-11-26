import { cert, getAuth, getFirestore, initializeApp } from '@/deps.ts';
import { config } from '@/config/environment.ts';

export function initializeFirebase() {
  try {
    const app = initializeApp({
      credential: cert({
        projectId: config.firebase.projectId,
        privateKey: config.firebase.privateKey,
        clientEmail: config.firebase.clientEmail,
      }),
    });

    const db = getFirestore(app);
    const auth = getAuth(app);

    console.log('✅ Firebase initialized successfully');

    return { db, auth, app };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
}
