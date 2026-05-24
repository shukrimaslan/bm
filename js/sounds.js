// ── sounds.js — Web Audio API sound effects ─────────────────────
// No audio files needed — all sounds generated programmatically.
// Usage: import { playCorrect, playWrong, playLevelUp, playStreak } from './sounds.js';

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

// Check if sounds are enabled (persisted in localStorage)
export function isSoundEnabled() {
  return localStorage.getItem('bmvocab_sound') !== 'off';
}
export function setSoundEnabled(on) {
  localStorage.setItem('bmvocab_sound', on ? 'on' : 'off');
}
export function toggleSound() {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
}

// ── Core tone generator ───────────────────────────────────────────
function playTone(freq, type='sine', duration=0.15, volume=0.3, delay=0) {
  if (!isSoundEnabled()) return;
  try {
    const c   = getCtx();
    const osc = c.createOscillator();
    const gain= c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type      = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + delay);
    gain.gain.setValueAtTime(volume, c.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.05);
  } catch(e) { /* AudioContext blocked — ignore */ }
}

function playToneSeq(notes) {
  // notes: [{freq, type, duration, volume, delay}]
  notes.forEach(n => playTone(n.freq, n.type||'sine', n.duration||0.15, n.volume||0.25, n.delay||0));
}

// ── Sound effects ─────────────────────────────────────────────────

// ✅ Correct answer — two ascending tones, bright and satisfying
export function playCorrect() {
  playToneSeq([
    { freq:523, type:'sine',    duration:.1,  volume:.25, delay:0    }, // C5
    { freq:659, type:'sine',    duration:.15, volume:.25, delay:.09  }, // E5
  ]);
}

// ❌ Wrong answer — low descending buzz
export function playWrong() {
  playToneSeq([
    { freq:220, type:'sawtooth', duration:.12, volume:.15, delay:0   },
    { freq:185, type:'sawtooth', duration:.18, volume:.12, delay:.1  },
  ]);
}

// ⬆️ Level up — ascending fanfare
export function playLevelUp() {
  playToneSeq([
    { freq:392, type:'sine', duration:.12, volume:.3, delay:0    }, // G4
    { freq:494, type:'sine', duration:.12, volume:.3, delay:.13  }, // B4
    { freq:587, type:'sine', duration:.12, volume:.3, delay:.26  }, // D5
    { freq:784, type:'sine', duration:.25, volume:.35,delay:.39  }, // G5
  ]);
}

// 🔥 Streak milestone — quick triple pop
export function playStreakMilestone() {
  playToneSeq([
    { freq:440, type:'sine', duration:.08, volume:.2, delay:0    },
    { freq:554, type:'sine', duration:.08, volume:.2, delay:.09  },
    { freq:659, type:'sine', duration:.15, volume:.3, delay:.18  },
  ]);
}

// 🎯 Quiz complete — cheerful arpeggio
export function playQuizComplete() {
  playToneSeq([
    { freq:262, type:'sine', duration:.1,  volume:.2, delay:0    }, // C4
    { freq:330, type:'sine', duration:.1,  volume:.2, delay:.1   }, // E4
    { freq:392, type:'sine', duration:.1,  volume:.2, delay:.2   }, // G4
    { freq:523, type:'sine', duration:.2,  volume:.3, delay:.3   }, // C5
  ]);
}

// 📚 Card flip — light tick
export function playFlip() {
  playTone(800, 'sine', 0.05, 0.08);
}

// ✅ Pack complete — triumphant chord-ish
export function playPackComplete() {
  playToneSeq([
    { freq:523, type:'sine', duration:.3, volume:.2, delay:0    },
    { freq:659, type:'sine', duration:.3, volume:.2, delay:0    },
    { freq:784, type:'sine', duration:.3, volume:.2, delay:0    },
    { freq:1047,type:'sine', duration:.4, volume:.25,delay:.25  },
  ]);
}
