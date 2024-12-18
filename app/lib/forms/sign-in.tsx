"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "../actions/sign-in";

export default function SignIn() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <>
      <form
        action={formAction}
        className="flex flex-col items-center gap-2 p-2 w-fit h-fit border rounded-lg"
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="p-1 border border-slate-200 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="p-1 border border-slate-200 rounded-md"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            aria-disabled={isPending}
            className="flex justify-center items-center p-2 border h-fit w-full border-slate-200 rounded-md hover:bg-slate-300 transition-colors"
          >
            Sign in
          </button>
        </div>
        <div className="flex flex-col items-center gap-1">
          {errorMessage && (
            <p className="font-semibold text-red-500">{errorMessage}</p>
          )}
          <hr className="w-full shadow-lg h-0.5" />
          <Link href="/login/sign-up">
            <p className="font-medium text-cyan-500 hover:text-cyan-600 transition-colors">
              Don`t have an account?
            </p>
          </Link>
        </div>
      </form>
    </>
  );
}
