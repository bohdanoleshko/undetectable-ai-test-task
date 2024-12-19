import { getUserId } from "@/app/api/get-user-id";
import { prisma } from "@/app/api/prisma-api/prisma-client";
import classNames from "classnames";
import Link from "next/link";
import { deleteChat } from "../../actions/openai-actions/delete-chat";
import { redirect } from "next/navigation";

export default async function ChatList() {
  const userId = await getUserId();
  const chats = await prisma.chat.findMany({ where: { userId: userId } });
  return (
    <ul className="flex flex-col overflow-y-auto overflow-x-hidden">
      {chats.map((chat, index) => (
        <div key={chat.id} className="flex relative w-full">
          <Link href={`/chat/${chat.id}`} className="w-full">
            <li
              className={classNames(
                "flex items-center justify-between hover:bg-slate-50 hover:shadow-sm transition-colors rounded-md p-1 cursor-pointer w-full",
                { "border-b": index !== chats.length - 1 }
              )}
            >
              {chat.chatName}
            </li>
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteChat(chat.id);
              redirect(`/chat`);
            }}
            className="absolute right-1 top-0.5"
          >
            <input type="hidden" name="chatId" value={chat.id} />
            <button
              type="submit"
              className="flex items-center justify-center font-semibold text-sm text-slate-500 px-3 py-1 hover:bg-slate-100 rounded-md transition-colors"
            >
              x
            </button>
          </form>
        </div>
      ))}
    </ul>
  );
}
