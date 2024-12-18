"use client";

import { useActionState } from "react";
import { signout } from "../actions/sign-out";

export default function SignOut() {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [state, action] = useActionState(signout, undefined);

  return (
    <form action={action}>
      <button className="flex justify-center items-center p-1 border border-slate-200 rounded-md hover:bg-slate-300 transition-colors ml-auto">
        Sign out
      </button>
    </form>
  );
}
