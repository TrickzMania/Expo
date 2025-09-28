// auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Remove the global auth and provider initialization
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

export function initAuth(onUserChanged) {
  // Initialize auth inside the function after Firebase app is already set up
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.email);
    } else {
      console.log("User logged out");
    }
    onUserChanged(user);
  });
}

export async function login() {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (err) {
    console.error("Login failed:", err);
    return { success: false, error: err.message };
  }
}

export async function logout() {
  try {
    const auth = getAuth();
    await signOut(auth);
    return { success: true };
  } catch (err) {
    console.error("Logout failed:", err);
    return { success: false, error: err.message };
  }
}

export function getCurrentUser() {
  const auth = getAuth();
  return auth.currentUser;
}
