// ── cache.js — offline word & pack caching ──────────────────────
// Caches Firestore data in localStorage so the app works offline.
// Keys:
//   bmvocab_packs        → array of pack objects
//   bmvocab_words_{packId} → array of words for a pack
//   bmvocab_cache_ts     → timestamp of last full cache

const CACHE_TTL_MS   = 24 * 60 * 60 * 1000; // 24 hours
const KEY_PACKS      = 'bmvocab_packs';
const KEY_WORDS      = (packId) => `bmvocab_words_${packId}`;
const KEY_TS         = 'bmvocab_cache_ts';
const KEY_ALL_WORDS  = 'bmvocab_all_words';

// ── Save ─────────────────────────────────────────────────────────
export function cachePacks(packs) {
  try {
    localStorage.setItem(KEY_PACKS, JSON.stringify(packs));
    localStorage.setItem(KEY_TS, Date.now().toString());
  } catch(e) { console.warn('Cache write failed:', e); }
}

export function cacheWords(packId, words) {
  try {
    localStorage.setItem(KEY_WORDS(packId), JSON.stringify(words));
  } catch(e) { console.warn('Cache write failed:', e); }
}

export function cacheAllWords(words) {
  try {
    localStorage.setItem(KEY_ALL_WORDS, JSON.stringify(words));
  } catch(e) { console.warn('Cache write failed:', e); }
}

// ── Load ─────────────────────────────────────────────────────────
export function getCachedPacks() {
  try {
    const raw = localStorage.getItem(KEY_PACKS);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function getCachedWords(packId) {
  try {
    const raw = localStorage.getItem(KEY_WORDS(packId));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function getCachedAllWords() {
  try {
    const raw = localStorage.getItem(KEY_ALL_WORDS);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── Cache freshness ───────────────────────────────────────────────
export function isCacheStale() {
  const ts = localStorage.getItem(KEY_TS);
  if (!ts) return true;
  return Date.now() - parseInt(ts) > CACHE_TTL_MS;
}

export function isOnline() {
  return navigator.onLine;
}

// ── Clear ─────────────────────────────────────────────────────────
export function clearCache() {
  Object.keys(localStorage)
    .filter(k => k.startsWith('bmvocab_'))
    .forEach(k => localStorage.removeItem(k));
}

// ── Smart loader — tries network first, falls back to cache ───────
// Returns { data, fromCache }
export async function smartLoad(fetchFn, cacheGetFn, cacheSetFn) {
  if (isOnline()) {
    try {
      const data = await fetchFn();
      if (cacheSetFn) cacheSetFn(data);
      return { data, fromCache: false };
    } catch(e) {
      console.warn('Network failed, trying cache:', e);
      const cached = cacheGetFn ? cacheGetFn() : null;
      if (cached) return { data: cached, fromCache: true };
      throw e;
    }
  } else {
    const cached = cacheGetFn ? cacheGetFn() : null;
    if (cached) return { data: cached, fromCache: true };
    throw new Error('Offline and no cache available');
  }
}
