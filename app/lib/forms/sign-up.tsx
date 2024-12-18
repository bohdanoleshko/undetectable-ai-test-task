"use client";

import { useActionState } from "react";
import { signUp, SignUpState } from "../actions/sign-up";

export default function SignUp() {
  const initialActionState: SignUpState = { errors: {}, message: null };
  const [state, formAction, isPending] = useActionState(
    signUp,
    initialActionState
  );

  return (
    <form
      action={formAction}
      className="flex p-2 flex-col justify-between gap-4 w-fit h-fit border rounded-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-sm">
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
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-sm">
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
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-sm">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
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
        {isPending ? "Registering..." : "Register"}
      </button>
      {state.message?.length && (
        <p className="font-semibold text-red-500">{state.message}</p>
      )}
    </form>
  );
}
