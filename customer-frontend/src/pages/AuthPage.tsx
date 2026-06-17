import {
  SignIn,
  SignUp,
} from "@clerk/clerk-react";

import { useState } from "react";

export default function AuthPage() {

  const [mode,setMode] =
  useState("signin");

  return (

    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      bg-zinc-50
      dark:bg-black

      p-6
      "
    >

      <div
        className="
        bg-white
        dark:bg-zinc-900

        p-6

        rounded-3xl

        shadow-xl
        "
      >

        {mode === "signin" ? (

          <>
            <SignIn />

            <button
              onClick={() =>
                setMode("signup")
              }
              className="
              mt-4

              w-full

              text-sm
              "
            >
              Create Account
            </button>
          </>

        ) : (

          <>
            <SignUp />

            <button
              onClick={() =>
                setMode("signin")
              }
              className="
              mt-4

              w-full

              text-sm
              "
            >
              Already have account?
            </button>
          </>

        )}

      </div>

    </div>

  );

}