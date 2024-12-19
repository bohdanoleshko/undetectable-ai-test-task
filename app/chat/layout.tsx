import ChatList from "../lib/components/chat-list/chat-list";
import ChatForm from "../lib/components/request-form/request-form";
import SignOut from "../lib/components/auth-forms/sign-out";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full border rounded-lg">
      <div className="flex flex-col gap-8 p-2 border-e max-w-52 w-full flex-wrap">
        <div className="flex justify-between">
          <div className="flex justify-between flex-wrap gap-2">
            <Link
              href="/chat"
              className="flex justify-center items-center p-1 border border-slate-200 rounded-md hover:bg-slate-300 transition-colors"
            >
              Create new chat
            </Link>
            <SignOut />
          </div>
        </div>
        <ChatList />
      </div>
      <div className="flex flex-col h-full w-full justify-between">
        {children}
        <div className="border-t p-2 h-fit max-h-36 sm:max-h-40 ">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
