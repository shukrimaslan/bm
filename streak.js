// ── streak.js — shared streak & XP helpers ──────────────────────
import { db } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── 12 Levels — easier early thresholds to keep students motivated
export const LEVELS = [
  { title: "Pelajar Baru",       minXP: 0    },  // 1
  { title: "Pelajar Aktif",      minXP: 50   },  // 2
  { title: "Pelajar Rajin",      minXP: 120  },  // 3
  { title: "Pelajar Tekun",      minXP: 220  },  // 4
  { title: "Pelajar Cemerlang",  minXP: 350  },  // 5
  { title: "Bintang Bahasa",     minXP: 520  },  // 6
  { title: "Juara BM",           minXP: 750  },  // 7
  { title: "Pakar Bahasa",       minXP: 1050 },  // 8
  { title: "Tokoh Bahasa",       minXP: 1450 },  // 9
  { title: "Sarjana Bahasa",     minXP: 2000 },  // 10
  { title: "Mahaguru Bahasa",    minXP: 2700 },  // 11
  { title: "Legenda Bahasa",     minXP: 3500 },  // 12 (max)
];

export function getLevel(xp) {
  let idx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) { idx = i; break; }
  }
  return {
    idx,
    ...LEVELS[idx],
    next: LEVELS[Math.min(idx + 1, LEVELS.length - 1)],
  };
}

// Returns user profile doc, creating it if missing
export async function getUserProfile(uid) {
  const ref  = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const profile = {
      xp: 0, streak: 0,
      lastStudyDate: null,
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, profile);
    return profile;
  }
  return snap.data();
}

// ── Auto-calculate current school year ──────────────────────────
// Malaysian academic year typically starts in January, but some
// schools (especially in certain states) start after January.
// We account for this with a configurable "year start month".
const SCHOOL_YEAR_START_MONTH = 1; // 1 = January. Change to 2 for February etc.

export function calcCurrentSchoolYear(savedYearNum, savedCalendarYear) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-based
  const currentYear  = now.getFullYear();

  // How many academic years have passed since the student set their year
  let academicYearsPassed = currentYear - savedCalendarYear;
  // If we haven't reached the school year start month yet, academic year hasn't turned over
  if (currentMonth < SCHOOL_YEAR_START_MONTH) {
    academicYearsPassed -= 1;
  }
  academicYearsPassed = Math.max(0, academicYearsPassed);
  return savedYearNum + academicYearsPassed;
}

export function getSchoolYearLabel(level, yearNum) {
  if (level === "primary") {
    const capped = Math.min(yearNum, 6);
    return `Tahun ${capped}`;
  } else {
    const capped = Math.min(yearNum, 5);
    return `Tingkatan ${capped}`;
  }
}

// Call after every study/quiz session.
// Returns { newStreak, streakBroken, xpGained, newXP, leveledUp, newLevel }
export async function recordStudySession(uid, xpGained) {
  const ref     = doc(db, "users", uid);
  const profile = await getUserProfile(uid);

  const today     = new Date().toDateString();
  const lastDate  = profile.lastStudyDate;
  const yesterday = new Date(Date.now() - 864e5).toDateString();

  let newStreak   = profile.streak || 0;
  let streakBroken = false;

  if (lastDate === today) {
    // Already studied today — no streak change, still award XP
  } else if (lastDate === yesterday) {
    newStreak += 1;
  } else if (!lastDate) {
    newStreak = 1;
  } else {
    newStreak    = 1;
    streakBroken = true;
  }

  const oldXP    = profile.xp || 0;
  const newXP    = oldXP + xpGained;
  const oldLevel = getLevel(oldXP);
  const newLevel = getLevel(newXP);
  const leveledUp = newLevel.idx > oldLevel.idx;

  await updateDoc(ref, {
    xp:            newXP,
    streak:        newStreak,
    lastStudyDate: today,
  });

  return { newStreak, streakBroken, xpGained, newXP, leveledUp, newLevel };
}
