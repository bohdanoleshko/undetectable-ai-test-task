"use client";

import TextareaAutosize from "react-textarea-autosize";

export default function ChatForm() {
  return (
    <form className="flex flex-col gap-2 text-sm h-full w-full">
      <TextareaAutosize
        className="p-1 w-full resize-none focus:outline-none focus:ring-0"
        placeholder="Type your text ..."
        maxLength={10000}
      ></TextareaAutosize>
      <button
        type="submit"
        className="border border-slate-200 rounded-full w-full py-1 px-2 hover:bg-slate-50 hover:text-gray-400 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
