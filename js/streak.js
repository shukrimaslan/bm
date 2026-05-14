// ── streak.js — shared streak & XP helpers ──────────────────────
import { db } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Level thresholds
export const LEVELS = [
  { title: "Pelajar Baru",      minXP: 0    },
  { title: "Pelajar Aktif",     minXP: 100  },
  { title: "Pelajar Rajin",     minXP: 250  },
  { title: "Pelajar Cemerlang", minXP: 500  },
  { title: "Juara BM",          minXP: 1000 },
  { title: "Pakar Bahasa",      minXP: 2000 },
];

export function getLevel(xp) {
  let idx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) { idx = i; break; }
  }
  return { idx, ...LEVELS[idx], next: LEVELS[Math.min(idx + 1, LEVELS.length - 1)] };
}

// Returns user profile doc, creating it if missing
export async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const profile = { xp: 0, streak: 0, lastStudyDate: null, createdAt: serverTimestamp() };
    await setDoc(ref, profile);
    return profile;
  }
  return snap.data();
}

// Call after every study/quiz session.
// Returns { newStreak, streakBroken, xpGained, newXP, leveledUp, newLevel }
export async function recordStudySession(uid, xpGained) {
  const ref = doc(db, "users", uid);
  const profile = await getUserProfile(uid);

  const today = new Date().toDateString();
  const lastDate = profile.lastStudyDate;
  const yesterday = new Date(Date.now() - 864e5).toDateString();

  let newStreak = profile.streak || 0;
  let streakBroken = false;

  if (lastDate === today) {
    // Already studied today — streak unchanged, still award XP
  } else if (lastDate === yesterday) {
    newStreak += 1;           // Consecutive day
  } else if (!lastDate) {
    newStreak = 1;            // First time ever
  } else {
    newStreak = 1;            // Missed a day — reset
    streakBroken = true;
  }

  const oldXP = profile.xp || 0;
  const newXP  = oldXP + xpGained;
  const oldLevel = getLevel(oldXP);
  const newLevel = getLevel(newXP);
  const leveledUp = newLevel.idx > oldLevel.idx;

  await updateDoc(ref, {
    xp: newXP,
    streak: newStreak,
    lastStudyDate: today,
  });

  return { newStreak, streakBroken, xpGained, newXP, leveledUp, newLevel };
}
