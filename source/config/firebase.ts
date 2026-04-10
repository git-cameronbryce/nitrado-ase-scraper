import serviceAccount from "./firebase.json";
import { getFirestore } from "firebase/firestore";

import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const storage = admin.storage();
