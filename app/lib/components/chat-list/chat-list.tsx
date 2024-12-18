import classNames from "classnames";
import { randomInt } from "crypto";
import Link from "next/link";

const source = [
  { id: 1, chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
  { id: randomInt(200), chatName: "Chat" },
];
export default async function ChatList() {
  return (
    <ul className="flex flex-col">
      {source.map((chat, index) => (
        <Link key={chat.id} href={`/chat/${chat.id}`}>
          <li
            className={classNames(
              "flex items-center hover:bg-slate-50 hover:shadow-sm transition-colors rounded-md p-1 cursor-pointer",
              { "border-b": index !== source.length - 1 }
            )}
          >
            {chat.chatName}
          </li>
        </Link>
      ))}
    </ul>
  );
}
