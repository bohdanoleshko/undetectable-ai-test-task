import classNames from "classnames";
import { randomInt } from "crypto";

const source = [
  { id: randomInt(200), chatName: "Chat" },
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
        <li
          key={chat.id}
          className={classNames(
            "flex items-center hover:bg-slate-50 hover:shadow-sm transition-colors rounded-md p-1 cursor-pointer",
            { "border-b": index !== source.length - 1 }
          )}
        >
          {chat.chatName}
        </li>
      ))}
    </ul>
  );
}
