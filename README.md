# 🇲🇾 BM Vocab 2 — Belajar Bahasa Malaysia

**An interactive, gamified Bahasa Malaysia vocabulary learning web app for primary and secondary school students in Malaysia.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Firebase%20Hosting-orange?style=for-the-badge&logo=firebase)](https://bm-vocab-app.web.app)
[![Made with Firebase](https://img.shields.io/badge/Backend-Firebase-yellow?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![HTML CSS JS](https://img.shields.io/badge/Frontend-HTML%20%2B%20CSS%20%2B%20JS-blue?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web)
[![PWA](https://img.shields.io/badge/PWA-Installable-purple?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Seeding Word Data](#-seeding-word-data)
- [Firestore Security Rules](#-firestore-security-rules)
- [PWA Installation](#-pwa-installation)
- [Word Packs](#-word-packs)
- [Gamification System](#-gamification-system)
- [School Level System](#-school-level-system)
- [Friends System](#-friends-system)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

BM Vocab is a **free, open-source, web-based vocabulary learning app** designed specifically for Malaysian students learning Bahasa Malaysia. Built with plain HTML, CSS, and JavaScript — no frameworks required — it runs entirely in the browser and connects to Firebase for real-time data, authentication, and progress tracking.

Students can study flashcards, take quizzes, earn XP, maintain streaks, compete on leaderboards, and connect with friends — all while learning 480+ carefully curated BM vocabulary words across 16 themed packs.

> 💡 **No app store required.** Install directly from the browser as a Progressive Web App (PWA).

---

## ✨ Features

### 📚 Learning
- **480 vocabulary words** across **16 themed packs** (BM ↔ English)
- **Flashcard mode** with 3D flip animation and audio pronunciation
- **Three quiz modes:** MCQ, Type Answer, Speed Round
- **Word of the Day** — level-matched daily vocabulary highlight
- **Audio pronunciation** using Web Speech API (free, no API key needed)
- **Example sentences** in Bahasa Malaysia for every word

### 🎮 Gamification
- **XP system** — earn points for studying and quizzing
- **12 level ranks** from *Pelajar Baru* to *Legenda Bahasa*
- **Daily streak tracking** with automatic reset detection
- **20 achievement badges** across multiple categories
- **Global leaderboard** ranked by total XP
- **Friends leaderboard** — compete with added friends

### 🏫 School Level System
- **Onboarding flow** — students pick Primary (Tahun 1–6) or Secondary (Tingkatan 1–5)
- **Adaptive difficulty** — Primary gets 3 MCQ options, 5 lives, 12s speed timer; Secondary gets harder settings
- **Auto year advance** — school year increments automatically each academic year
- **Pack filtering** — primary students see primary packs first; secondary packs can be unlocked

### 👫 Social
- **Friend codes** — 6-character codes for easy friend adding
- **Nicknames** — assign custom labels to friends (e.g. "Abang", "Siti")
- **Mutual friends** — adding a friend connects both sides automatically
- **Cross-level friends** — siblings and family can connect across school levels
- **Friends leaderboard tab** — see how you rank among your friends

### 📱 App Experience
- **Progressive Web App (PWA)** — installable on Android and iOS home screen
- **Offline mode** — words and packs cached in localStorage for offline study
- **Dark mode** — toggle in profile, persists across sessions
- **Bilingual UI** — switch between English and Bahasa Malaysia interface
- **Guest mode** — explore all packs and quizzes without an account
- **Bottom sheet navigation** — tap a pack card to open a smooth action sheet

### 🔐 Auth & Security
- Google Sign-In, Email/Password, and Anonymous (Guest) login
- Firestore security rules — users can only read/write their own data
- Progress and XP not saved for guest users (by design)

---

## 📸 Screenshots

> *(Add screenshots here after deployment)*

| Home | Flashcard | Quiz | Progress |
|------|-----------|------|----------|
| ![Home](screenshots/home.png) | ![Study](screenshots/study.png) | ![Quiz](screenshots/quiz.png) | ![Progress](screenshots/progress.png) |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Plain HTML5, Tailwind CSS (CDN), Vanilla JavaScript (ES Modules) |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore (NoSQL) |
| Hosting | Firebase Hosting |
| Offline | Service Worker + localStorage caching |
| Audio | Web Speech API (`SpeechSynthesisUtterance`) |
| PWA | `manifest.json` + `sw.js` |
| CI/CD | GitHub Actions → Firebase Hosting auto-deploy |

**No build tools. No npm. No framework.** Just open the HTML files in a browser.

---

## 📁 Project Structure

```
bm-vocab-app/
│
├── index.html          # Login page (Google, Email, Guest)
├── onboarding.html     # First-time school level picker (3-step flow)
├── home.html           # Word packs grid, Word of the Day, stats
├── study.html          # Flashcard study mode
├── quiz.html           # MCQ / Type Answer / Speed Round quiz
├── progress.html       # Progress report, badges, level tracker
├── leaderboard.html    # Global + Friends XP ranking
├── friends.html        # Friend codes, add/edit/remove friends
├── profile.html        # Dark mode, language, school level, account
├── seed.html           # One-time data importer (delete after use)
│
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline caching)
├── firestore.rules     # Firestore security rules
│
└── js/
    ├── firebase.js     # Firebase app initialisation (Auth + Firestore)
    ├── streak.js       # XP, level system, streak logic, school year calc
    ├── theme.js        # Dark mode toggle and persistence
    ├── i18n.js         # EN/BM UI language strings and toggle
    ├── cache.js        # Offline word/pack caching via localStorage
    └── guest.js        # Guest sign-in modal and sign-out helper
```

---

## 🚀 Getting Started

### Prerequisites

- A [Firebase](https://firebase.google.com) account (free Spark plan is sufficient)
- A [GitHub](https://github.com) account
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally:

```bash
npm install -g firebase-tools
```

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/bm-vocab-app.git
cd bm-vocab-app
```

### 2. Configure Firebase

Replace the config values in `js/firebase.js` with your own Firebase project credentials:

```js
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};
```

### 3. Deploy to Firebase Hosting

```bash
firebase login
firebase init hosting   # Set public dir to "." and single-page app to "No"
firebase deploy
```

### 4. Set up GitHub Actions (auto-deploy)

During `firebase init hosting`, select **"Set up GitHub Actions"** when prompted. Every push to `main` will automatically deploy your app.

---

## 🔥 Firebase Setup

### Enable Authentication

In Firebase Console → **Authentication** → Sign-in method, enable:

- ✅ **Google**
- ✅ **Email/Password**
- ✅ **Anonymous** ← required for Guest mode

### Create Firestore Database

Firebase Console → **Firestore Database** → **Create database** → Start in **test mode** → Select a region close to Malaysia (e.g. `asia-southeast1`).

### Create Firestore Index (for Friends feature)

The friends search requires a single-field index:

1. Firebase Console → Firestore → **Indexes** tab
2. Click **Add Index**
3. Collection: `users`, Field: `friendCode` (Ascending)

> **Shortcut:** Open `friends.html` in your browser and try adding a friend — Firebase will print a direct link in the browser console to create the index automatically.

---

## 🌱 Seeding Word Data

The app comes with 480 vocabulary words across 16 packs, ready to import.

1. Deploy the app (or run it locally via `firebase serve`)
2. Navigate to `seed.html`
3. Sign in with Google when prompted
4. Click **"🚀 Import All Data"**
5. Wait for the progress bar to complete
6. **Delete `seed.html`** from your project — it's no longer needed

> ⚠️ The seed script clears all existing words before importing. Run it only once unless you want to reset all word data.

---

## 🔒 Firestore Security Rules

Copy the contents of `firestore.rules` into **Firebase Console → Firestore → Rules tab** and click **Publish**.

Key rules:
- Words and packs are **readable** by all logged-in users
- Words and packs are **writable** by authenticated non-guest users (for seeding)
- User profiles are readable by all (for leaderboard/friends), but writable only by the owner
- Progress sub-collection is strictly owner-only read/write
- Friends sub-collection allows mutual writes (so adding a friend updates both sides)

---

## 📲 PWA Installation

The app is installable as a Progressive Web App on any device:

**Android (Chrome):**
1. Open the app URL in Chrome
2. Tap the **three-dot menu** → **"Add to Home Screen"**
3. Tap **Install**

**iOS (Safari):**
1. Open the app URL in Safari
2. Tap the **Share** button → **"Add to Home Screen"**
3. Tap **Add**

> You'll need to add app icons at `icons/icon-192.png` and `icons/icon-512.png` for the full PWA experience. Recommended: generate icons at [realfavicongenerator.net](https://realfavicongenerator.net).

---

## 📦 Word Packs

| # | Pack | Emoji | Level | Words |
|---|------|-------|-------|-------|
| 1 | Perasaan | 😊 | Primary | 30 |
| 2 | Di Sekolah | 🏫 | Primary | 30 |
| 3 | Makanan & Minuman | 🍛 | Primary | 30 |
| 4 | Keluarga | 👨‍👩‍👧 | Primary | 30 |
| 5 | Alam Semula Jadi | 🌿 | Primary | 30 |
| 6 | Warna & Bentuk | 🎨 | Primary | 30 |
| 7 | Sukan & Hobi | ⚽ | Secondary | 30 |
| 8 | Anggota Badan | 🧍 | Secondary | 30 |
| 9 | Masa & Waktu | 🕐 | Secondary | 30 |
| 10 | Kata Tindakan | ✏️ | Secondary | 30 |
| 11 | Haiwan | 🐘 | Primary | 30 |
| 12 | Kerjaya & Pekerjaan | 💼 | Secondary | 30 |
| 13 | Teknologi & ICT | 💻 | Secondary | 30 |
| 14 | Kesihatan & Badan | 🏥 | Secondary | 30 |
| 15 | Pengangkutan | 🚗 | Primary | 30 |
| 16 | Kata Sifat | 🌈 | Secondary | 30 |

**Total: 480 words** — each with a BM word, English meaning, and a BM example sentence.

---

## 🏆 Gamification System

### XP & Levels

| Level | Title | XP Required |
|-------|-------|-------------|
| 1 | Pelajar Baru | 0 XP |
| 2 | Pelajar Aktif | 50 XP |
| 3 | Pelajar Rajin | 120 XP |
| 4 | Pelajar Tekun | 220 XP |
| 5 | Pelajar Cemerlang | 350 XP |
| 6 | Bintang Bahasa | 520 XP |
| 7 | Juara BM | 750 XP |
| 8 | Pakar Bahasa | 1,050 XP |
| 9 | Tokoh Bahasa | 1,450 XP |
| 10 | Sarjana Bahasa | 2,000 XP |
| 11 | Mahaguru Bahasa | 2,700 XP |
| 12 | Legenda Bahasa | 3,500 XP |

### XP Earning

| Action | XP Earned |
|--------|-----------|
| Flashcard "I Know It" | +5 XP per word |
| MCQ correct answer | +8 XP (Primary) / +10 XP (Secondary) |
| Speed Round correct | +12 XP (Primary) / +15 XP (Secondary) |
| Type Answer correct | +8 XP / +10 XP |

### Achievement Badges (20 total)

Badges are earned automatically as students hit milestones — from knowing their first word to completing all 16 packs, maintaining a 30-day streak, and more.

---

## 🏫 School Level System

### Onboarding
New users go through a 3-step onboarding:
1. **Pick level** — Primary 🏫 or Secondary 🎓
2. **Pick year** — Tahun 1–6 or Tingkatan 1–5
3. **Confirm** — see their quiz difficulty, packs, and friend code

### Adaptive Difficulty

| Setting | 🏫 Primary | 🎓 Secondary |
|---------|-----------|-------------|
| MCQ options | 3 choices | 4 choices |
| Lives | ❤️×5 | ❤️×3 |
| Speed timer | 12 seconds | 8 seconds |
| Quiz length | 8 questions | 10 questions |
| Card direction | English → BM | BM → English |

### Auto Year Advance
The school year is stored numerically with the calendar year it was set. Each academic year (configurable start month, default January), the displayed year increments automatically — no student action required.

---

## 👫 Friends System

1. Each user gets a unique **6-character friend code** (first 6 chars of their Firebase UID)
2. Share your code with a classmate or family member
3. They enter your code in `friends.html` → both sides are connected automatically
4. Assign **nicknames** to friends so you know who's who
5. Friends appear in the **Friends leaderboard tab** on `leaderboard.html`
6. Works **across school levels** — siblings and family can be friends regardless of Primary/Secondary

---

## 🗺 Roadmap

### Phase C — Teacher & School Features
- [ ] Teacher account type
- [ ] Create a class with a join code
- [ ] Assign specific word packs to a class
- [ ] Teacher dashboard — view per-student progress
- [ ] Class leaderboard

### Phase D — More Content
- [ ] 200+ additional words (total 700+)
- [ ] Peribahasa pack
- [ ] Kata Nama Khas pack
- [ ] KSSR/KSSM curriculum-aligned packs

### Future Ideas
- [ ] Spaced repetition (SRS) algorithm
- [ ] Push notifications for streak reminders
- [ ] Text-to-speech with native Malay voice (Google TTS API)
- [ ] Parent dashboard
- [ ] School-wide leaderboard

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** this repository
2. **Create a branch** for your feature: `git checkout -b feature/new-pack`
3. **Add your changes** — new word packs, bug fixes, UI improvements
4. **Commit** with a clear message: `git commit -m "Add: Peribahasa word pack"`
5. **Push** to your fork: `git push origin feature/new-pack`
6. **Open a Pull Request** describing your changes

### Adding New Word Packs

To add words, edit the `PACKS` and `WORDS` arrays in `seed.html`, then re-run the seeder. Each word needs:

```js
{
  bm:         "berani",                          // BM word
  en:         "brave",                           // English meaning
  pack:       "perasaan",                        // pack ID
  example_bm: "Dia seorang murid yang berani.",  // example sentence in BM
  level:      "primary"                          // "primary" or "secondary"
}
```

### Reporting Bugs

Please [open an issue](https://github.com/yourusername/bm-vocab-app/issues) with:
- A clear description of the bug
- Steps to reproduce
- Expected vs actual behaviour
- Browser and device used

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, copy, modify, and distribute this project for personal, educational, or commercial purposes with attribution.

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com) — backend, auth, and hosting
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework
- [Nunito Font](https://fonts.google.com/specimen/Nunito) — friendly, rounded typeface
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — free browser-native TTS
- Dewan Bahasa dan Pustaka — for Bahasa Malaysia vocabulary reference

---

<div align="center">

Made with ❤️ for Malaysian students

**[🚀 Live Demo](https://bm-vocab-app.web.app) · [🐛 Report Bug](https://github.com/yourusername/bm-vocab-app/issues) · [💡 Request Feature](https://github.com/yourusername/bm-vocab-app/issues)**

</div>
