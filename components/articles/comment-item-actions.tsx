"use client";

import { useState } from "react";

import { deleteCommentAction, updateCommentAction } from "@/lib/actions/articles";

export function CommentItemActions({
  commentId,
  slug,
  content
}: {
  commentId: string;
  slug: string;
  content: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  return (
    <div className="mt-3">
      {editing ? (
        <form
          action={async (formData) => {
            await updateCommentAction(formData);
            setEditing(false);
          }}
          className="space-y-2"
        >
          <input type="hidden" name="commentId" value={commentId} />
          <input type="hidden" name="slug" value={slug} />

          <textarea
            name="content"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[100px] w-full rounded-md border p-3 text-sm"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Edit
          </button>

          <form action={deleteCommentAction}>
            <input type="hidden" name="commentId" value={commentId} />
            <input type="hidden" name="slug" value={slug} />

            <button
              type="submit"
              className="text-xs font-medium text-red-600 hover:underline"
            >
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
