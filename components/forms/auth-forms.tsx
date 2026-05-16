"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";

import { forgotPasswordAction, loginAction, signUpAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormMessage({ message, status }: { message?: string; status: string }) {
  if (!message) return null;
  return <p className={status === "success" ? "text-sm text-emerald-700" : "text-sm text-red-600"}>{message}</p>;
}

export function LoginForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(loginAction, initialActionState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const registered = searchParams.get("registered") === "1";

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{dictionary.forms.loginTitle}</CardTitle>
        <CardDescription>{dictionary.forms.loginDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {registered && (
          <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              {dictionary.forms.registrationSuccessful}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {dictionary.messages.accountCreated}
            </p>
          </div>
        )}

        <form action={action} className="space-y-5">
          <input type="hidden" name="next" value={next} />
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.forms.email}</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{dictionary.forms.password}</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <FormMessage message={state.message} status={state.status} />
          <SubmitButton className="w-full" pendingText={dictionary.forms.loginPending}>
            {dictionary.nav.login}
          </SubmitButton>
        </form>
        <div className="mt-5 flex justify-between text-sm">
          <Link href="/forgot-password" className="text-slate-500 hover:text-slate-950">
            {dictionary.forms.forgotPassword}
          </Link>
          <Link href="/signup" className="font-medium text-blue-800 hover:text-blue-950">
            {dictionary.forms.createAccount}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function SignUpForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(signUpAction, initialActionState);
  const isSuccess = state.status === "success";

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{dictionary.forms.signupTitle}</CardTitle>
        <CardDescription>{dictionary.forms.signupDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
            <p className="text-lg font-semibold text-green-700 dark:text-green-400">
              {dictionary.forms.registrationSuccessful}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {dictionary.messages.accountCreated}
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex items-center rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              {dictionary.forms.goToLogin}
            </Link>
          </div>
        ) : (
          <>
            <form action={action} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{dictionary.forms.fullName}</Label>
                  <Input id="fullName" name="fullName" autoComplete="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">{dictionary.forms.username}</Label>
                  <Input id="username" name="username" autoComplete="username" required />

                  <p className="text-xs text-slate-500">
                    {dictionary.forms.usernameHint}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{dictionary.forms.email}</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{dictionary.forms.password}</Label>
                <Input id="password" name="password" type="password" autoComplete="new-password" required />

              <p className="text-xs text-slate-500">
                {dictionary.forms.passwordHint}
              </p>
              </div>
              <FormMessage message={state.message} status={state.status} />
              <SubmitButton className="w-full" pendingText={dictionary.forms.signupPending}>
                {dictionary.forms.createAccount}
              </SubmitButton>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              {dictionary.forms.alreadyHaveAccount}{" "}
              <Link href="/login" className="font-medium text-blue-800 hover:text-blue-950">
                {dictionary.nav.login}
              </Link>
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function ForgotPasswordForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(forgotPasswordAction, initialActionState);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{dictionary.forms.resetTitle}</CardTitle>
        <CardDescription>{dictionary.forms.resetDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.forms.email}</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <FormMessage message={state.message} status={state.status} />
          <SubmitButton className="w-full" pendingText={dictionary.common.sending}>
            {dictionary.forms.sendReset}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
