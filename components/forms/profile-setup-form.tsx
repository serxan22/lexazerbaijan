"use client";

import { useFormState } from "react-dom";

import { profileSetupAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ProfileDefaults = {
  fullName?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  university?: string | null;
  workplace?: string | null;
  interests?: string[] | null;
  linkedin?: string | null;
  website?: string | null;
};

export function ProfileSetupForm({
  defaults,
  dictionary
}: {
  defaults?: ProfileDefaults;
  dictionary: Dictionary;
}) {
  const [state, action] = useFormState(profileSetupAction, initialActionState);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{dictionary.forms.profileTitle}</CardTitle>
        <CardDescription>{dictionary.forms.profileDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">{dictionary.forms.fullName}</Label>
              <Input id="fullName" name="fullName" defaultValue={defaults?.fullName ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">{dictionary.forms.username}</Label>
              <Input id="username" name="username" defaultValue={defaults?.username ?? ""} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatarUrl">{dictionary.forms.avatarUrl}</Label>
            <Input id="avatarUrl" name="avatarUrl" defaultValue={defaults?.avatarUrl ?? ""} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="university">{dictionary.forms.university}</Label>
              <Input id="university" name="university" defaultValue={defaults?.university ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workplace">{dictionary.forms.workplace}</Label>
              <Input id="workplace" name="workplace" defaultValue={defaults?.workplace ?? ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">{dictionary.forms.bio}</Label>
            <Textarea id="bio" name="bio" defaultValue={defaults?.bio ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">{dictionary.forms.interests}</Label>
            <Input id="interests" name="interests" defaultValue={defaults?.interests?.join(", ") ?? ""} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="linkedin">{dictionary.forms.linkedin}</Label>
              <Input id="linkedin" name="linkedin" defaultValue={defaults?.linkedin ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">{dictionary.forms.website}</Label>
              <Input id="website" name="website" defaultValue={defaults?.website ?? ""} />
            </div>
          </div>
          {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
          <SubmitButton pendingText={dictionary.forms.savingProfile}>{dictionary.forms.saveProfile}</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
