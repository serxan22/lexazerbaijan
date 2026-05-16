"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Bot, Send, User } from "lucide-react";

import { askLexAiAction } from "@/lib/actions/lexai";
import { initialActionState } from "@/lib/form-state";
import { SubmitButton } from "@/components/forms/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function LexAiForm() {
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
      <Card className="flex h-[700px] flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-700" />
            Ask LexAI
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-0">
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6">
            {messages.length === 0 ? (
              <div className="rounded-xl border border-dashed bg-white p-6 text-center text-sm text-slate-500">
                Start a conversation with LexAI
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
                        ? "bg-blue-700 text-white"
                        : "border bg-white text-slate-700"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold opacity-80">
                      {message.role === "user" ? (
                        <>
                          <User className="h-3.5 w-3.5" />
                          You
                        </>
                      ) : (
                        <>
                          <Bot className="h-3.5 w-3.5" />
                          LexAI
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
            className="border-t bg-white p-4"
          >
            <div className="flex items-end gap-3">
              <Textarea
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a legal research question..."
                className="min-h-[80px] resize-none"
                required
              />

              <SubmitButton
                variant="gold"
                pendingText="Thinking..."
              >
                <Send className="h-4 w-4" />
              </SubmitButton>
            </div>
          </form>
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
