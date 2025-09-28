// auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export function initAuth(onUserChanged) {
  onAuthStateChanged(auth, (user) => {
    onUserChanged(user);
  });
}

export async function login() {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error("Login failed:", err);
  }
}

export function logout() {
  return signOut(auth);
}
