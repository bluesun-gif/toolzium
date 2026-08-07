"use client";

import { signIn } from "@/lib/auth-client";
import logger from "@/lib/logger";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";

export default function SignInWithGoogle() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    toast.loading("Connecting to Google authentication...", { id: "google-auth" });
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      logger.error({ error }, "Google sign in error");
      toast.error("Failed to sign in with Google", { id: "google-auth" });
      setIsGoogleLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleLogin}
      disabled={isGoogleLoading}
      className="w-full h-10 gap-2 font-medium"
    >
      {isGoogleLoading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0 text-primary" />
      ) : (
        <Image src="/assets/google.png" alt="Google" width={18} height={18} className="shrink-0" />
      )}
      {isGoogleLoading ? "Connecting with Google..." : "Continue with Google"}
    </Button>
  );
}
