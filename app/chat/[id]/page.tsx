import { prisma } from "@/app/api/prisma-api/prisma-client";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let currentChat;

  try {
    currentChat = await prisma.chat.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (err) {
    throw new Error(`Failed to find chat: ${err}`);
  }

  let content;

  if (currentChat) {
    try {
      content = await prisma.content.findUnique({
        where: { id: currentChat.contentId },
      });
    } catch (err) {
      throw new Error(`Failed to find content: ${err}`);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full px-4 py-2 overflow-auto">
      <div className="flex gap-3 justify-end">
        <div className="w-4/5 sm:w-2/3 px-4 py-2 bg-slate-100 rounded-lg ">
          {content && content.request}
        </div>
      </div>
      <div className="w-full">{content && content.response}</div>
    </div>
  );
}
