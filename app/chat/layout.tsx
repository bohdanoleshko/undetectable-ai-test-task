import ChatList from "../lib/components/chat-list/chat-list";
import ChatForm from "../lib/components/request-form/request-form";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col gap-8 p-2 border-e w-44">
        <h2 className="text-xl">Your tabs</h2>
        <ChatList />
      </div>
      <div className="flex flex-col h-full w-full justify-between">
        {children}
        <div className="border-t p-2 h-fit max-h-36 sm:max-h-40 ">
          <ChatForm />
        </div>
      </div>
    </>
  );
}
