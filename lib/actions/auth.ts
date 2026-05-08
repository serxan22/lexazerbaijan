"use server";

import { createClient } from "@/lib/supabase/server";

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialActionState: ActionState = {
  status: "idle",
  message: "",
};

export async function signUpAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password) {
      return {
        status: "error",
        message: "Email and password are required.",
      };
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: name,
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        console.error("Profile upsert error:", profileError);
      }
    }

    // ✅ redirect() YOX — state-i öldürür. Client Link ilə navigate edir.
    return {
      status: "success",
      message: "Account created successfully. You can now log into your account.",
    };
  } catch (err) {
    console.error("signUpAction error:", err);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
