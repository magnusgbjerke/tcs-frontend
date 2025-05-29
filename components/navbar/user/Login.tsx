"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/components/Button";

export function Login() {
  return <Button onClick={() => signIn("keycloak")}>Login</Button>;
}
