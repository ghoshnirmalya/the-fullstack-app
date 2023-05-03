"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const GoogleButton = () => {
  return (
    <Button onClick={() => signIn("google")} className="w-full">
      Sign in with Google
    </Button>
  );
};
