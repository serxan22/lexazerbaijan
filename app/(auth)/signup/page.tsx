import { SignUpForm } from "@/components/forms/auth-forms";
import { getDictionary, getLocale } from "@/lib/i18n";

export const metadata = {
  title: "Sign up",
  description: "Create a new account",
};

export default async function SignUpPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return (
    <>
      <style>{`
        .auth-page { min-height:100dvh; display:grid; place-items:center; padding:2rem 1rem; background:#f8fafc; font-family:'Georgia','Times New Roman',serif; }
        .auth-card { width:100%; max-width:420px; background:#fff; border:1px solid rgba(217,199,159,.9); border-radius:12px; padding:2.5rem 2rem; box-shadow:0 18px 60px rgba(15,23,42,.08); }
        .form-title { font-size:1.625rem; font-weight:700; color:#0B1220; margin:0 0 .375rem; letter-spacing:-.02em; }
        .form-subtitle { font-size:.9rem; color:#6b6b63; margin:0 0 1.75rem; font-family:system-ui,sans-serif; }
        .signup-form { display:flex; flex-direction:column; gap:1.125rem; }
        .field-group { display:flex; flex-direction:column; gap:.375rem; }
        .field-label { font-size:.8125rem; font-weight:600; color:#3a3a36; font-family:system-ui,sans-serif; }
        .field-input { width:100%; padding:.65rem .875rem; border:1.5px solid #d9c79f; border-radius:7px; font-size:.9375rem; color:#0B1220; background:#fff; outline:none; font-family:system-ui,sans-serif; box-sizing:border-box; transition:border-color .15s,box-shadow .15s; }
        .field-input:focus { border-color:#B8894A; box-shadow:0 0 0 3px rgba(184,137,74,.14); background:#fff; }
        .submit-btn { margin-top:.375rem; width:100%; padding:.75rem 1rem; background:#0B1220; color:#fff; border:none; border-radius:7px; font-size:.9375rem; font-weight:600; cursor:pointer; transition:background .15s,opacity .15s; font-family:system-ui,sans-serif; }
        .submit-btn:hover:not(:disabled) { background:#172033; }
        .submit-btn:disabled { opacity:.55; cursor:not-allowed; }
        .login-hint { text-align:center; font-size:.875rem; color:#6b6b63; margin:.25rem 0 0; font-family:system-ui,sans-serif; }
        .login-link { color:#8a612f; font-weight:600; text-decoration:none; }
        .login-link:hover { text-decoration:underline; }
        .error-banner { display:flex; align-items:flex-start; gap:.5rem; padding:.75rem 1rem; background:#fff5f5; border:1.5px solid #fca5a5; border-radius:7px; font-size:.875rem; color:#b91c1c; font-family:system-ui,sans-serif; margin-bottom:.25rem; }
        .success-card { display:flex; flex-direction:column; align-items:center; text-align:center; padding:1rem 0; animation:fadeSlideIn .35s ease both; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .success-icon { width:56px; height:56px; color:#B8894A; margin-bottom:1.25rem; }
        .success-icon svg { width:100%; height:100%; }
        .success-title { font-size:1.5rem; font-weight:700; color:#0B1220; margin:0 0 .625rem; letter-spacing:-.02em; }
        .success-message { font-size:.9375rem; color:#4b4b45; margin:0 0 2rem; line-height:1.55; font-family:system-ui,sans-serif; max-width:300px; }
        .go-to-login-btn { display:inline-flex; align-items:center; gap:.25rem; padding:.75rem 2rem; background:#B8894A; color:#fff; border-radius:7px; font-size:.9375rem; font-weight:600; text-decoration:none; transition:background .15s,transform .1s; font-family:system-ui,sans-serif; }
        .go-to-login-btn:hover { background:#A7783F; transform:translateY(-1px); }
        .dark .auth-page { background:#020611; }
        .dark .auth-card { background:#07111f; border-color:rgba(184,137,74,.24); box-shadow:0 18px 60px rgba(0,0,0,.28); }
        .dark .form-title, .dark .success-title { color:#fff; }
        .dark .field-label { color:#e2e8f0; }
        .dark .form-subtitle, .dark .login-hint, .dark .success-message { color:#cbd5e1; }
        .dark .field-input { background:#0b1728; border-color:rgba(184,137,74,.34); color:#fff; }
      `}</style>
      <main className="auth-page">
        <div className="auth-card">
          <SignUpForm dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}
