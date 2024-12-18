import { prisma } from "@/app/api/prisma-api/prisma-client";

export const revalidate = 60;

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentChat = await prisma.chat.findUnique({
    where: { id: parseInt(id as string) },
  });
  const content = await prisma.content.findUnique({
    where: { id: currentChat?.contentId },
  });

  return (
    <div className="flex flex-col gap-6 w-full px-4 py-2">
      <div className="w-1/2 px-4 py-2 bg-slate-100 rounded-lg self-end">
        {content?.request}
      </div>
      <div className="w-full">{content?.response}</div>
    </div>
  );
}
