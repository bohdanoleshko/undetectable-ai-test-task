"use server";

import { prisma } from "@/app/api/prisma-api/prisma-client";
import { revalidatePath } from "next/cache";

export async function deleteChat(chatId: number) {
  try {
    await prisma.chat.delete({
      where: { id: chatId },
    });

    revalidatePath("/chat");
  } catch (err) {
    throw new Error(`Failed to delete chat: ${err}`);
  }
}
