"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { summarizeText } from "../../../api/openai-api/summarize-text";

const prisma = new PrismaClient();

export async function createChat(
  state: void,
  formData: FormData
): Promise<void> {
  const request = formData.get("request") as string;
  const summary = (await summarizeText(request)) as string;

  const token = await auth();
  const userID = parseInt(token!.user!.id);

  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const content = await prisma.content.create({
    data: {
      request,
      response: summary,
    },
  });

  const chatCount =
    (await prisma.chat.findMany({ where: { userId: userID } })).length + 1;

  const chat = await prisma.chat.create({
    data: {
      chatName: `Chat ${chatCount}`,
      userId: userID,
      contentId: content.id,
    },
  });

  revalidatePath("/chat");
  redirect(`/chat/${chat.id}`);
}
