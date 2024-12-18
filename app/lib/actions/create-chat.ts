"use server";

import { PrismaClient } from "@prisma/client";
import openai from "../open-api";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createChat(
  state: void,
  formData: FormData
): Promise<void> {
  const request = formData.get("request") as string;
  const summary = (await summarizeText(request)) as string;

  const token = await auth();
  const userID = token?.user?.id;

  if (!userID) {
    throw new Error("User is not authenticated");
  }

  const content = await prisma.content.create({
    data: {
      request,
      response: summary,
    },
  });

  const chat = await prisma.chat.create({
    data: {
      chatName: "Chat Session",
      userId: parseInt(userID),
      contentId: content.id,
    },
  });

  revalidatePath("/chat");
  redirect(`/chat/${chat.id}`);
}

async function summarizeText(inputText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "user",
          content: `Summarize the following text: ${inputText}`,
        },
      ],
    });

    const summary = response.choices[0].message.content;

    return summary;
  } catch (error) {
    throw new Error(`Failed to summarize text: ${error}`);
  }
}
