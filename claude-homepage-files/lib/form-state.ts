export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

export const initialActionState: ActionState = {
  status: "idle"
};

export function zodErrors(errors: { fieldErrors: Record<string, string[] | undefined> }) {
  return Object.fromEntries(
    Object.entries(errors.fieldErrors).filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
  );
}
