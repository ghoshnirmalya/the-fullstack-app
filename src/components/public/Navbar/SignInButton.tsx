"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button onClick={() => signIn()} className="px-8 py-4">
      Sign in
    </Button>
  );
};
