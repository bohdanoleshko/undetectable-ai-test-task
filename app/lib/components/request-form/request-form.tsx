"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useActionState, useState } from "react";
import { createChat } from "../../actions/openai-actions/create-chat";
import { useParams } from "next/navigation";
import { updateRequest } from "../../actions/openai-actions/update-request";
import classNames from "classnames";

export default function ChatForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [createChatState, createChatAction, isCreatingInPending] =
    useActionState(createChat, undefined);
  const { id } = useParams();
  const updateChat = updateRequest.bind(null, id as string);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [updateChatState, updateChatAction, isUpdatingInPending] =
    useActionState(updateChat, undefined);
  const isChatEmpty = id === undefined;
  const [input, setInput] = useState("");
  const isDisabled =
    input.length === 0 || isCreatingInPending || isUpdatingInPending;

  return (
    <form
      action={isChatEmpty ? createChatAction : updateChatAction}
      className="flex flex-col justify-center items-center gap-2 text-sm h-20 w-full"
    >
      {isCreatingInPending || isUpdatingInPending ? (
        <div className="loader h-3 w-3"></div>
      ) : (
        <>
          <TextareaAutosize
            className="p-1 w-full resize-none focus:outline-none focus:ring-0"
            name="request"
            placeholder="Type your text ..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
            maxLength={10000}
          ></TextareaAutosize>
          <button
            type="submit"
            disabled={isDisabled}
            className={classNames(
              "border border-slate-200 rounded-full w-full py-1 px-2  transition-colors",
              { "bg-slate-200 text-gray-400": isDisabled },
              { "hover:bg-slate-50 hover:text-gray-400": !isDisabled }
            )}
          >
            {isChatEmpty ? "Send" : "Update"}
          </button>
        </>
      )}
    </form>
  );
}
