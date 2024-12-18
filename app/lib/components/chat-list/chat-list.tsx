import { prisma } from "@/app/api/prisma-api/prisma-client";
import classNames from "classnames";
import Link from "next/link";

export default async function ChatList() {
  const chats = await prisma.chat.findMany();
  return (
    <ul className="flex flex-col">
      {chats.map((chat, index) => (
        <Link key={chat.id} href={`/chat/${chat.id}`}>
          <li
            className={classNames(
              "flex items-center hover:bg-slate-50 hover:shadow-sm transition-colors rounded-md p-1 cursor-pointer",
              { "border-b": index !== chats.length - 1 }
            )}
          >
            {chat.chatName}
          </li>
        </Link>
      ))}
    </ul>
  );
}
