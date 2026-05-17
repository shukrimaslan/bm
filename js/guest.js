// ── guest.js — guest sign-in helpers ────────────────────────────
// Shared across home, progress, leaderboard, profile pages.
// Provides signOutAndRedirect() and signInWithGooglePopup()

import { auth } from "./firebase.js";
import { signOut, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Signs out the current (anonymous/guest) user then goes to index.html
export async function signOutAndRedirect() {
  try {
    await signOut(auth);
  } catch(e) { console.warn('Signout error:', e); }
  window.location.href = "index.html";
}

// Attempts Google sign-in popup directly from any page.
// On success, redirects to onboarding or home depending on profile.
export async function signInWithGoogleDirect() {
  try {
    const provider = new GoogleAuthProvider();
    const result   = await signInWithPopup(auth, provider);
    const user     = result.user;

    // Check if onboarding done
    const { getFirestore, doc, getDoc }
      = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
    const db   = getFirestore();
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists() && snap.data().onboardingDone) {
      window.location.href = "home.html";
    } else {
      window.location.href = "onboarding.html";
    }
  } catch(e) {
    console.warn('Google sign-in failed:', e);
    alert('Sign-in failed. Please try again.');
  }
}

// Shows a small modal with sign-in options
export function showSignInModal() {
  // Remove existing modal if any
  document.getElementById('guestSignInModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'guestSignInModal';
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.55);
    z-index:200;display:flex;align-items:flex-end;justify-content:center;
  `;
  modal.innerHTML = `
    <div style="background:white;border-radius:1.5rem 1.5rem 0 0;padding:2rem 1.5rem 2.5rem;width:100%;max-width:480px;font-family:'Nunito',sans-serif;">
      <div style="width:40px;height:4px;background:#e5e7eb;border-radius:99px;margin:0 auto 1.5rem;"></div>
      <div style="text-align:center;margin-bottom:1.5rem;">
        <div style="font-size:2.5rem;margin-bottom:.5rem;">🔐</div>
        <h3 style="font-size:1.25rem;font-weight:900;color:#1f2937;margin:0 0 .25rem;">Sign In to Continue</h3>
        <p style="font-size:.875rem;color:#6b7280;margin:0;">Save your progress, streaks & achievements</p>
      </div>
      <button id="googleSignInBtn" style="width:100%;display:flex;align-items:center;justify-content:center;gap:.75rem;background:white;border:2px solid #e5e7eb;border-radius:1rem;padding:.875rem;font-weight:800;font-size:.9rem;cursor:pointer;margin-bottom:.75rem;">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width:20px;height:20px;"/>
        Continue with Google
      </button>
      <button id="emailSignInBtn" style="width:100%;background:#16a34a;color:white;border:none;border-radius:1rem;padding:.875rem;font-weight:900;font-size:.9rem;cursor:pointer;margin-bottom:.75rem;">
        ✉️ Sign In with Email
      </button>
      <button id="cancelSignInBtn" style="width:100%;background:#f9fafb;border:none;border-radius:1rem;padding:.75rem;font-weight:800;font-size:.85rem;color:#6b7280;cursor:pointer;">
        Stay as Guest
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('googleSignInBtn').onclick = async () => {
    modal.remove();
    await signInWithGoogleDirect();
  };
  document.getElementById('emailSignInBtn').onclick = () => {
    modal.remove();
    signOutAndRedirect(); // go to index.html which has email login
  };
  document.getElementById('cancelSignInBtn').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}
