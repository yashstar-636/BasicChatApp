import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD4oi763o-MRVJVSgP1rZawvPUctV5hh-k",
  authDomain: "chatuuapp.firebaseapp.com",
  projectId: "chatuuapp",
  storageBucket: "chatuuapp.firebasestorage.app",
  messagingSenderId: "1046865122253",
  appId: "1:1046865122253:web:c1e131ade87652c3de2a84",
  measurementId: "G-GNJT4KE73E"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);