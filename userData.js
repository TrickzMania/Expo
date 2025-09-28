// userData.js
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Remove this line - Firebase should be initialized in your HTML files
// const db = getFirestore();

// ⭐ Star an event
export async function toggleStar(userId, eventId) {
  const db = getFirestore(); // Initialize inside function
  const starRef = doc(db, "users", userId, "stars", eventId);
  const snap = await getDoc(starRef);

  if (snap.exists()) {
    await setDoc(starRef, {}, { merge: false }); // remove
    return false;
  } else {
    await setDoc(starRef, { starredAt: new Date() });
    return true;
  }
}

// ⭐ Get all starred events for a user
export async function getStarred(userId) {
  const db = getFirestore(); // Initialize inside function
  const starsSnap = await getDocs(collection(db, "users", userId, "stars"));
  return starsSnap.docs.map(doc => doc.id);
}
