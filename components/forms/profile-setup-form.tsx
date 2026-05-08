"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";

import { profileSetupAction } from "@/lib/actions/auth";
import { initialActionState } from "@/lib/form-state";
import type { Dictionary } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";

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
  const [avatarUrl, setAvatarUrl] = useState(defaults?.avatarUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadAvatar(file: File) {
    if (!file) return;

    setUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `profiles/${fileName}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (error) {
        alert(error.message);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

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

          <div className="space-y-3">
            <Label>Profile photo</Label>

            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl || undefined} alt={defaults?.fullName ?? "Profile"} />
                <AvatarFallback>{initials(defaults?.fullName ?? "User")}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <input type="hidden" name="avatarUrl" value={avatarUrl} />

                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) uploadAvatar(file);
                  }}
                />

                <p className="text-xs text-slate-500">
                  Upload JPG, PNG, or WEBP image. {uploading ? "Uploading..." : ""}
                </p>
              </div>
            </div>
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

          <SubmitButton pendingText={dictionary.forms.savingProfile}>
            {dictionary.forms.saveProfile}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
