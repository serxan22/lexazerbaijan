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
        .auth-page { min-height:100dvh; display:grid; place-items:center; padding:2rem 1rem; background:#f8f8f6; font-family:'Georgia','Times New Roman',serif; }
        .auth-card { width:100%; max-width:420px; background:#fff; border:1px solid #e2e2dc; border-radius:12px; padding:2.5rem 2rem; box-shadow:0 4px 24px rgba(0,0,0,0.06); }
        .form-title { font-size:1.625rem; font-weight:700; color:#1a1a18; margin:0 0 .375rem; letter-spacing:-.02em; }
        .form-subtitle { font-size:.9rem; color:#6b6b63; margin:0 0 1.75rem; font-family:system-ui,sans-serif; }
        .signup-form { display:flex; flex-direction:column; gap:1.125rem; }
        .field-group { display:flex; flex-direction:column; gap:.375rem; }
        .field-label { font-size:.8125rem; font-weight:600; color:#3a3a36; font-family:system-ui,sans-serif; }
        .field-input { width:100%; padding:.65rem .875rem; border:1.5px solid #d4d4cc; border-radius:7px; font-size:.9375rem; color:#1a1a18; background:#fafaf8; outline:none; font-family:system-ui,sans-serif; box-sizing:border-box; transition:border-color .15s,box-shadow .15s; }
        .field-input:focus { border-color:#2d6a4f; box-shadow:0 0 0 3px rgba(45,106,79,.12); background:#fff; }
        .submit-btn { margin-top:.375rem; width:100%; padding:.75rem 1rem; background:#1a1a18; color:#fff; border:none; border-radius:7px; font-size:.9375rem; font-weight:600; cursor:pointer; transition:background .15s,opacity .15s; font-family:system-ui,sans-serif; }
        .submit-btn:hover:not(:disabled) { background:#2d6a4f; }
        .submit-btn:disabled { opacity:.55; cursor:not-allowed; }
        .login-hint { text-align:center; font-size:.875rem; color:#6b6b63; margin:.25rem 0 0; font-family:system-ui,sans-serif; }
        .login-link { color:#2d6a4f; font-weight:600; text-decoration:none; }
        .login-link:hover { text-decoration:underline; }
        .error-banner { display:flex; align-items:flex-start; gap:.5rem; padding:.75rem 1rem; background:#fff5f5; border:1.5px solid #fca5a5; border-radius:7px; font-size:.875rem; color:#b91c1c; font-family:system-ui,sans-serif; margin-bottom:.25rem; }
        .success-card { display:flex; flex-direction:column; align-items:center; text-align:center; padding:1rem 0; animation:fadeSlideIn .35s ease both; }
        @keyframes fadeSlideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .success-icon { width:56px; height:56px; color:#2d6a4f; margin-bottom:1.25rem; }
        .success-icon svg { width:100%; height:100%; }
        .success-title { font-size:1.5rem; font-weight:700; color:#1a1a18; margin:0 0 .625rem; letter-spacing:-.02em; }
        .success-message { font-size:.9375rem; color:#4b4b45; margin:0 0 2rem; line-height:1.55; font-family:system-ui,sans-serif; max-width:300px; }
        .go-to-login-btn { display:inline-flex; align-items:center; gap:.25rem; padding:.75rem 2rem; background:#2d6a4f; color:#fff; border-radius:7px; font-size:.9375rem; font-weight:600; text-decoration:none; transition:background .15s,transform .1s; font-family:system-ui,sans-serif; }
        .go-to-login-btn:hover { background:#1f4d38; transform:translateY(-1px); }
      `}</style>
      <main className="auth-page">
        <div className="auth-card">
          <SignUpForm dictionary={dictionary} />
        </div>
      </main>
    </>
  );
}
