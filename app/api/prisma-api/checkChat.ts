import { prisma } from "./prisma-client";

export async function checkChat(chatId: string) {
  const currentChat = await prisma.chat.findUnique({
    where: { id: parseInt(chatId) },
  });

  const contentCount = await prisma.content.count({
    where: { id: currentChat?.contentId },
  });

  return { currentChat, contentCount };
}
