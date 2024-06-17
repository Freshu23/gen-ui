"use client";

import { useState } from "react";
import { Message, continueConversation } from "./actions";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div className="px-4">
        {conversation.map((message, index) => (
          <div className="my-2" key={index}>
            {message.role === "assistant" && "🤖 "}
            {message.role}: {message.content}
            {message.display}
          </div>
        ))}
      </div>

      <div className="flex fixed bottom-4 left-4 w-full items-center gap-5">
        <input
          className="w-1/4 p-2 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-white rounded-md h-full text-black p-2 px-4"
          onClick={async () => {
            const { messages } = await continueConversation([
              // exclude React components from being sent back to the server:
              ...conversation.map(({ role, content }) => ({ role, content })),
              { role: "user", content: input },
            ]);

            setConversation(messages);
            setInput("");
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
