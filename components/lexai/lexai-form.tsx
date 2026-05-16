"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Bot, Send, User } from "lucide-react";

import { askLexAiAction } from "@/lib/actions/lexai";
import { initialActionState } from "@/lib/form-state";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/i18n";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function LexAiForm({ dictionary }: { dictionary: Dictionary }) {
  const [state, action] = useFormState(askLexAiAction, initialActionState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const lastQuestion = useRef("");

  useEffect(() => {
    const answer = state.message;

    if (typeof answer === "string" && answer && lastQuestion.current) {
      const question = lastQuestion.current;

      setMessages((prev): Message[] => [
        ...prev,
        {
          role: "user",
          content: question
        },
        {
          role: "assistant",
          content: answer
        }
      ]);

      lastQuestion.current = "";
    }
  }, [state.message]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="flex h-[700px] flex-col overflow-hidden border-border/80 bg-card/95">
        <CardHeader className="border-b border-border/80">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-gold" />
            {dictionary.pages.lexAiPanelTitle}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-0">
          <div className="flex-1 space-y-4 overflow-y-auto bg-background/70 p-6">
            {messages.length === 0 ? (
              <div className="rounded-lg border border-dashed bg-card/80 p-6 text-center text-sm text-slate-500 dark:text-slate-300">
                {dictionary.pages.lexAiEmpty}
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${
                      message.role === "user"
                        ? "bg-gold text-slate-950"
                        : "border border-border/80 bg-card text-slate-700 dark:text-slate-100"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold opacity-80">
                      {message.role === "user" ? (
                        <>
                          <User className="h-3.5 w-3.5" />
                          {dictionary.pages.lexAiYou}
                        </>
                      ) : (
                        <>
                          <Bot className="h-3.5 w-3.5" />
                          {dictionary.pages.lexAiAssistant}
                        </>
                      )}
                    </div>

                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form
            action={(formData) => {
              const value = formData.get("question")?.toString() || "";

              lastQuestion.current = value;
              setQuestion("");

              action(formData);
            }}
            className="border-t border-border/80 bg-card p-4"
          >
            <div className="flex items-end gap-3">
              <Textarea
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={dictionary.pages.lexAiPlaceholder}
                className="min-h-[80px] resize-none"
                required
              />

              <SubmitButton
                variant="gold"
                pendingText={dictionary.pages.lexAiThinking}
              >
                <Send className="h-4 w-4" />
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{dictionary.pages.lexAiCapabilitiesTitle}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
          {dictionary.pages.lexAiCapabilities.map((capability) => (
            <p key={capability} className="flex gap-2 dark:text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
              <span>{capability}</span>
            </p>
          ))}

          <div className="rounded-lg border border-amber-300/40 bg-amber-500/10 p-3 text-xs leading-5 text-amber-800 dark:text-amber-200">
            {dictionary.pages.lexAiDisclaimer}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
