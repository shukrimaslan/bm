// ── i18n.js — EN / BM UI language strings ───────────────────────
// Usage:
//   import { t, initLang, toggleLang } from './i18n.js';
//   initLang();   // call once on page load
//   t('home')     // returns translated string

export const STRINGS = {
  // Nav
  home:         { en: 'Home',        bm: 'Utama'       },
  progress:     { en: 'Progress',    bm: 'Kemajuan'    },
  ranking:      { en: 'Ranking',     bm: 'Ranking'     },
  profile:      { en: 'Profile',     bm: 'Profil'      },
  friends:      { en: 'Friends',     bm: 'Rakan'       },

  // Home
  wordPacks:    { en: 'Word Packs',  bm: 'Pek Kata'    },
  wordOfDay:    { en: 'Word of the Day', bm: 'Kata Hari Ini' },
  tapReveal:    { en: '👆 Tap to reveal meaning', bm: '👆 Ketuk untuk lihat makna' },
  pronounce:    { en: '🔊 Pronounce', bm: '🔊 Sebutan'  },
  studyPack:    { en: '📚 Study Pack', bm: '📚 Belajar'  },
  all:          { en: 'All',         bm: 'Semua'       },
  wordsKnown:   { en: 'Words Known', bm: 'Kata Tahu'   },
  dayStreak:    { en: 'Day Streak',  bm: 'Hari Berturut'},
  loading:      { en: 'Loading...',  bm: 'Memuatkan...' },

  // Study
  iKnowIt:      { en: '✅ I Know It!', bm: '✅ Saya Tahu!' },
  notYet:       { en: '❌ Not Yet',   bm: '❌ Belum'     },
  packComplete: { en: 'Pack Complete!', bm: 'Pek Selesai!' },
  studyAgain:   { en: '🔁 Study Again', bm: '🔁 Belajar Semula' },
  takeQuiz:     { en: '🎯 Take a Quiz', bm: '🎯 Cuba Kuiz'  },
  backHome:     { en: '🏠 Back to Home', bm: '🏠 Kembali'   },
  english:      { en: 'English',     bm: 'Bahasa Inggeris' },
  malay:        { en: 'Bahasa Malaysia', bm: 'Bahasa Malaysia' },

  // Quiz
  correct:      { en: 'Correct',     bm: 'Betul'       },
  wrong:        { en: 'Wrong',       bm: 'Salah'       },
  score:        { en: 'Score',       bm: 'Skor'        },
  nextQ:        { en: 'Next Question →', bm: 'Soalan Seterusnya →' },
  tryAgain:     { en: '🔁 Try Again', bm: '🔁 Cuba Lagi' },
  wordsReview:  { en: '📖 Words to Review:', bm: '📖 Kata untuk Ulang Kaji:' },

  // Profile
  editName:     { en: 'Edit Display Name', bm: 'Edit Nama Paparan' },
  saveName:     { en: 'Save Name',    bm: 'Simpan Nama' },
  changePass:   { en: 'Change Password', bm: 'Tukar Kata Laluan' },
  updatePass:   { en: 'Update Password', bm: 'Kemas Kata Laluan' },
  darkMode:     { en: 'Dark Mode',    bm: 'Mod Gelap'   },
  language:     { en: 'Language',     bm: 'Bahasa'      },
  logout:       { en: '🚪 Log Out',   bm: '🚪 Log Keluar' },
  deleteAcc:    { en: '🗑️ Delete Account', bm: '🗑️ Padam Akaun' },
  schoolLevel:  { en: 'School Level', bm: 'Tahap Sekolah' },
  currentRank:  { en: 'Current Rank', bm: 'Pangkat Kini' },
  signIn:       { en: 'Sign In',      bm: 'Log Masuk'   },
  saveProgress: { en: 'Save Your Progress', bm: 'Simpan Kemajuan Anda' },

  // Progress
  achievements: { en: 'Achievements', bm: 'Pencapaian'  },
  levelProgress:{ en: 'Level Progress', bm: 'Kemajuan Tahap' },
  packProgress: { en: 'Pack Progress', bm: 'Kemajuan Pek' },
  mastered:     { en: 'mastered',     bm: 'dikuasai'    },

  // Leaderboard
  globalRanking:{ en: 'Global',       bm: 'Global'      },
  friendsRanking:{ en: 'Friends',     bm: 'Rakan'       },
  topLearners:  { en: 'Top Learners', bm: 'Pelajar Terbaik' },

  // Friends
  addFriend:    { en: 'Add Friend',   bm: 'Tambah Rakan' },
  friendCode:   { en: 'Your Friend Code', bm: 'Kod Rakan Anda' },
  enterCode:    { en: 'Enter friend code...', bm: 'Masukkan kod rakan...' },
  myFriends:    { en: 'My Friends',   bm: 'Rakan Saya'  },

  // Guest
  guestMode:    { en: "You're in Guest Mode", bm: 'Anda dalam Mod Tetamu' },
  guestDesc:    { en: "Progress won't be saved.", bm: 'Kemajuan tidak akan disimpan.' },
  signInSave:   { en: 'Sign in to track your learning!', bm: 'Log masuk untuk jejak pembelajaran!' },

  // Errors
  failedLoad:   { en: 'Failed to load. Check your connection.', bm: 'Gagal memuatkan. Semak sambungan anda.' },
  offline:      { en: '📶 Offline — showing cached data', bm: '📶 Tiada Talian — data cache dipaparkan' },
};

export function getLang() {
  return localStorage.getItem('bmvocab_lang') || 'en';
}

export function setLang(lang) {
  localStorage.setItem('bmvocab_lang', lang);
}

export function toggleLang() {
  const next = getLang() === 'en' ? 'bm' : 'en';
  setLang(next);
  return next;
}

// Translate a key
export function t(key) {
  const lang = getLang();
  return STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? key;
}

// Apply translations to all elements with data-i18n attribute
// <span data-i18n="home"></span>
export function initLang() {
  applyTranslations();
}

export function applyTranslations() {
  const lang = getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (STRINGS[key]?.[lang]) el.textContent = STRINGS[key][lang];
  });
  // Update lang toggle buttons if present
  const btn = document.getElementById('langToggleBtn');
  if (btn) btn.textContent = lang === 'en' ? '🌐 BM' : '🌐 EN';
}
