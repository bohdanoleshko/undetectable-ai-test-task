import { auth } from "@/auth";

export async function getUserId() {
  const token = await auth();
  const userID = token?.user?.id;

  if (!userID) {
    throw new Error("User is not authenticated");
  }

  return parseInt(userID);
}
