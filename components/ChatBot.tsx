"use client";

import { X } from "lucide-react";
import React from "react";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import InputField from "./InputField";

function mockChatBotApi(question: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `👋 Welcome! Thank you for reaching out. Our chat process is currently under development, so responses may be limited. If you have questions, feel free to ask!`
      );
    }, 1500);
  });
}

export function ChatBotWidget() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = usePathname();

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((msgs) => [...msgs, { from: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const response = await mockChatBotApi(question);
      setMessages((msgs) => [...msgs, { from: "bot", text: response }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  if (router.includes("/auth")) return null;

  if (!showChat)
    return (
      <button
        onClick={() => setShowChat(true)}
        className="bg-indigo-800 fixed bottom-[50px] right-[20px] z-10 px-2 py-3 hover:bg-indigo-950 transition-colors duration-500 ease-in-out rounded-[10px] text-white cursor-pointer"
      >
        <span role="img" aria-label="robot">
          🤖
        </span>
        ChatBot
      </button>
    );

  return (
    <div className="w-[400px] mx-auto p-4 bg-white rounded-[20px] shadow-lg flex flex-col h-[480px]  z-20 fixed border border-indigo-800 bottom-[50px] right-1.5">
      <div className="font-bold text-indigo-700 text-lg mb-2 flex justify-center items-center gap-2">
        <span role="img" aria-label="robot">
          🤖
        </span>
        ChatBot
      </div>
      <button
        onClick={() => setShowChat(false)}
        title="close the dialog"
        className="bg-rose-600 absolute top-2 right-1.5 px-2 p-1 rounded-full text-white cursor-pointer"
      >
        <X />
      </button>
      <div
        className="flex-1 overflow-y-auto mb-3 space-y-2 p-2 border rounded bg-gray-50"
        style={{ minHeight: "220px" }}
      >
        {messages.length === 0 ?
          <div className="text-center text-gray-400 mt-16">
            Ask me anything about compliance, regulations, or documentation!
          </div>
        : messages.map((msg, idx) => (
            <div
              key={idx}
              className={msg.from === "user" ? "text-right" : "text-left"}
            >
              <div
                className={`inline-block px-4 py-2 rounded-2xl ${
                  msg.from === "user" ?
                    "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
                } max-w-xs`}
              >
                {msg.text}
              </div>
            </div>
          ))
        }
        {loading && (
          <div className="flex space-x-1 mt-2">
            <span className="w-2 h-2 bg-gray-400 animate-bounce rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 animate-bounce rounded-full delay-100"></span>
            <span className="w-2 h-2 bg-gray-400 animate-bounce rounded-full delay-200"></span>
            <span className="text-xs text-gray-500 ml-2">
              Bot is typing&hellip;
            </span>
          </div>
        )}
      </div>
      <form
        className="flex gap-2 pt-2 border-t items-center"
        onSubmit={handleSend}
        autoComplete="off"
      >
        <InputField
          ref={inputRef}
          type="text"
          disable={loading}
          placeholder="Type your question..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`transition px-4 h-[50px]  py-1 rounded-[10px] bg-indigo-800 text-white font-medium hover:bg-indigo-950 disabled:bg-indigo-500`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
