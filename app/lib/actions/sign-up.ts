"use server";
import { prisma } from "@/app/api/prisma-api/prisma-client";
import { z } from "zod";
import { signIn } from "@/auth";
import bcryptjs from "bcryptjs";
const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username should be at least 2 characters long")
    .max(30, "Username should be less than 30 characters long"),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters long")
    .max(256, "Password should be less than 256 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password confirmation should be at least 8 characters long")
    .max(256, "Password confirmation should be less than 256 characters long"),
});

export type SignUpState = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export const signUp = async (state: SignUpState, formData: FormData) => {
  const validatedFields = SignUpSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Registration failed",
    };
  }

  const { username, password } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return {
      errors: { username: ["Registration failed"] },
      message: "The user already exists",
    };
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    username,
    password,
    redirectTo: "/chat/1",
  });

  return { success: true, user: user };
};
