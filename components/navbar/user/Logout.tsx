"use client";

import { Button } from "@/components/ui/components/Button";

export function Logout() {
  return (
    <Button
      onClick={async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/auth/signout`;
      }}
    >
      Log out
    </Button>
  );
}
