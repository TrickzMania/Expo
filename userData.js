// userData.js
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ⭐ Star an event
export async function toggleStar(userId, eventId) {
  try {
    console.log("toggleStar called - User:", userId, "Event:", eventId);
    const db = getFirestore();
    const starRef = doc(db, "users", userId, "stars", eventId);
    
    console.log("Checking if star exists...");
    const snap = await getDoc(starRef);
    console.log("Star exists:", snap.exists());

    if (snap.exists()) {
      console.log("Removing star...");
      await deleteDoc(starRef);
      console.log("Star removed successfully");
      return false;
    } else {
      console.log("Adding star...");
      await setDoc(starRef, { 
        starredAt: new Date(),
        eventId: eventId,
        userId: userId
      });
      console.log("Star added successfully");
      return true;
    }
  } catch (error) {
    console.error("🔥 toggleStar ERROR:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
}

// ⭐ Get all starred events for a user
export async function getStarred(userId) {
  try {
    console.log("getStarred called for user:", userId);
    const db = getFirestore();
    const starsSnap = await getDocs(collection(db, "users", userId, "stars"));
    const starredIds = starsSnap.docs.map(doc => doc.id);
    console.log("Found starred events:", starredIds);
    return starredIds;
  } catch (error) {
    console.error("Error in getStarred:", error);
    return [];
  }
}
