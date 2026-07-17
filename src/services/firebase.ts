import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFirestore as getFirestoreLite } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Full Firestore SDK (realtime-capable) — used by the admin panel only.
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Firestore Lite SDK — plain REST, no persistent "Listen" streaming channel.
// Used by public pages that only ever need a one-time read (articles list,
// article detail, latest articles widget), so we avoid the WebChannel
// handshake overhead that was dominating the critical request path.
export const dbLite = getFirestoreLite(app, firebaseConfig.firestoreDatabaseId);

export const storage = getStorage(app, `gs://${firebaseConfig.storageBucket}`);

export default app;
