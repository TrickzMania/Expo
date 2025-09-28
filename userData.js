// userData.js
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ⭐ Star an event
export async function toggleStar(userId, eventId) {
  try {
    const db = getFirestore();
    const starRef = doc(db, "users", userId, "stars", eventId);
    const snap = await getDoc(starRef);

    if (snap.exists()) {
      await setDoc(starRef, {}, { merge: false }); // remove
      return false;
    } else {
      await setDoc(starRef, { starredAt: new Date() });
      return true;
    }
  } catch (error) {
    console.error("Error in toggleStar:", error);
    throw error;
  }
}

// ⭐ Get all starred events for a user
export async function getStarred(userId) {
  try {
    const db = getFirestore();
    const starsSnap = await getDocs(collection(db, "users", userId, "stars"));
    return starsSnap.docs.map(doc => doc.id);
  } catch (error) {
    console.error("Error in getStarred:", error);
    return [];
  }
}
