import { Button } from "@/components/ui/components/Button";

export function Registration() {
  return (
    <Button
      onClick={async () => {
        window.location.href =
          `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations` +
          `?client_id=${encodeURIComponent(process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!)}` +
          `&redirect_uri=${encodeURIComponent("http://localhost:3000/auth/registration")}` +
          `&response_type=code` +
          `&scope=openid`;
      }}
    >
      Registration
    </Button>
  );
}
