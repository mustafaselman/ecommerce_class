//// burada google firebase ile etkileşime buradan girilecek.
import { initializeApp } from "firebase/app";
// authentication işlemleri için (giriş kontrol,yetkilendirme)
import { getAuth } from "firebase/auth"
// firestore database erişmek için (verilerin kayıt yeri)
import { getFirestore } from "firebase/firestore"
// storage erişimi için (resimlerin kayıt yeri)
import { getStorage } from "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyC541Olekoe2TDFO1CbIDMQoUGoGkdIXZk",
  authDomain: "eshop-36c71.firebaseapp.com",
  projectId: "eshop-36c71",
  storageBucket: "eshop-36c71.appspot.com",
  messagingSenderId: "667018684999",
  appId: "1:667018684999:web:0a92c24bfca3352a99df62"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app