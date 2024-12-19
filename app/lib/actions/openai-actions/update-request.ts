"use server";

import { prisma } from "@/app/api/prisma-api/prisma-client";
import { summarizeText } from "../../../api/openai-api/summarize-text";
import { checkChat } from "@/app/api/prisma-api/checkChat";
import { revalidatePath } from "next/cache";

export async function updateRequest(
  chatId: string,
  state: { request: FormData; response: string } | null | undefined,
  request: FormData
) {
  try {
    const req = request.get("request") as string;
    const response = await summarizeText(req);
    const { currentChat } = await checkChat(chatId);

    if (response && currentChat) {
      await prisma.content.update({
        where: { id: currentChat.contentId },
        data: { request: req, response: response },
      });

      revalidatePath(`/chat/${chatId}`);
      return { request, response };
    }

    return null;
  } catch (err) {
    throw new Error(`Failed to update request: ${err}`);
  }
}
