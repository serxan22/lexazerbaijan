"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { deleteCommentAction, updateCommentAction } from "@/lib/actions/articles";

export function CommentItemActions({
  commentId,
  slug,
  content,
  canManage
}: {
  commentId: string;
  slug: string;
  content: string;
  canManage: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const [reported, setReported] = useState(false);

  if (editing && canManage) {
    return (
      <form
        action={async (formData) => {
          await updateCommentAction(formData);
          setEditing(false);
          setOpen(false);
        }}
        className="mt-3 space-y-2"
      >
        <input type="hidden" name="commentId" value={commentId} />
        <input type="hidden" name="slug" value={slug} />

        <textarea
          name="content"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-[100px] w-full rounded-md border bg-white p-3 text-sm"
          required
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white">
            Save
          </button>
          <button type="button" onClick={() => setEditing(false)} className="rounded-md border px-3 py-1.5 text-sm">
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="absolute right-0 top-0 rounded-full p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-900"
        aria-label="Comment options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-7 z-20 w-36 rounded-md border bg-white p-1 text-sm shadow-lg">
          {canManage ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setEditing(true);
                  setOpen(false);
                }}
                className="w-full rounded px-3 py-2 text-left hover:bg-slate-100"
              >
                Edit
              </button>

              <form action={deleteCommentAction}>
                <input type="hidden" name="commentId" value={commentId} />
                <input type="hidden" name="slug" value={slug} />
                <button
                  type="submit"
                  className="w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </form>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setReported(true);
                setOpen(false);
              }}
              className="w-full rounded px-3 py-2 text-left hover:bg-slate-100"
            >
              {reported ? "Reported" : "Report"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
