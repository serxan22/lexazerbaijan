"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { signUpAction, initialActionState, type ActionState } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="submit-btn"
      aria-busy={pending}
    >
      {pending ? "Creating account…" : "Create account"}
    </button>
  );
}

function SuccessCard({ message }: { message: string }) {
  return (
    <div className="success-card" role="status" aria-live="polite">
      <div className="success-icon" aria-hidden="true">
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
          <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
          <path d="M14 27l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="success-title">You&apos;re all set!</h2>
      <p className="success-message">{message}</p>
      <Link href="/login" className="go-to-login-btn">
        Go to Login →
      </Link>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="error-banner" role="alert" aria-live="assertive">
      <span className="error-icon" aria-hidden="true">⚠</span>
      {message}
    </div>
  );
}

export function SignUpForm() {
  const [state, formAction] = useFormState<ActionState, FormData>(
    signUpAction,
    initialActionState
  );

  if (state.status === "success") {
    return <SuccessCard message={state.message} />;
  }

  return (
    <div className="signup-form-wrapper">
      <h1 className="form-title">Create your account</h1>
      <p className="form-subtitle">Join us today — it only takes a moment.</p>

      {state.status === "error" && <ErrorMessage message={state.message} />}

      <form action={formAction} className="signup-form" noValidate>
        <div className="field-group">
          <label htmlFor="name" className="field-label">Full name</label>
          <input id="name" name="name" type="text" autoComplete="name" required className="field-input" placeholder="Jane Doe" />
        </div>
        <div className="field-group">
          <label htmlFor="email" className="field-label">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field-input" placeholder="jane@example.com" />
        </div>
        <div className="field-group">
          <label htmlFor="password" className="field-label">Password</label>
          <input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className="field-input" placeholder="At least 8 characters" />
        </div>
        <SubmitButton />
        <p className="login-hint">
          Already have an account?{" "}
          <Link href="/login" className="login-link">Log in</Link>
        </p>
      </form>
    </div>
  );
}
