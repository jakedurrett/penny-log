import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUVcjfi_vIlhYYNG_XTu2YQmi49V1urcQ",
  authDomain: "penny-log-5eea3.firebaseapp.com",
  projectId: "penny-log-5eea3",
  storageBucket: "penny-log-5eea3.firebasestorage.app",
  messagingSenderId: "791490630018",
  appId: "1:791490630018:web:7cffdef0562fa028c27f9b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
