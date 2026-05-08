"use client";

import { useFormState } from "react-dom";
import { Bot, Send } from "lucide-react";

import { askLexAiAction } from "@/lib/actions/lexai";
import { initialActionState } from "@/lib/form-state";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function LexAiForm() {
  const [state, action] = useFormState(askLexAiAction, initialActionState);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-700" />
            Ask LexAI
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-4">
            <Textarea
              name="question"
              placeholder="Ask a legal research question..."
              className="min-h-[180px]"
              required
            />

            <SubmitButton variant="gold" pendingText="Thinking...">
              <Send className="h-4 w-4" />
              Ask LexAI
            </SubmitButton>
          </form>

          {state.message ? (
            <div className="mt-6 whitespace-pre-line rounded-xl border bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {state.message}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What LexAI can help with</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
          <p>• Explain legal concepts</p>
          <p>• Structure IRAC answers</p>
          <p>• Generate arguments and counterarguments</p>
          <p>• Summarize legal topics</p>
          <p>• Help with legal article ideas</p>

          <div className="rounded-lg border bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            LexAI is for educational and research support only. It does not provide legal advice.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
