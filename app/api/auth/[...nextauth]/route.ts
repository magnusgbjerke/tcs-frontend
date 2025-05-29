import { KeycloakJwtPayload } from "@/lib/utils";
import { CustomSession, CustomToken } from "@/next-auth";
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions, User, Account } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

async function refreshAccessToken(token: CustomToken): Promise<CustomToken> {
  try {
    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutes - match Keycloak token lifespan
    updateAge: 14 * 60, // Update 1 minute before expiration
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: CustomToken;
      user?: User;
      account: Account | null;
    }): Promise<CustomToken> {
      const now = Date.now();
      console.log(Date.now());

      // Initial sign-in
      if (account && user) {
        if (!account.expires_at)
          throw new Error("Missing expires_at on account");

        const decoded = jwtDecode<KeycloakJwtPayload>(
          account.access_token ?? "",
        );
        return {
          accessToken: account.access_token,
          accessTokenExpires: now + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
          roles: decoded.resource_access?.["tcs-client"]?.roles || [],
        };
      }

      // Token still valid
      if (token.accessTokenExpires && now < token.accessTokenExpires) {
        return token;
      }

      // Token expired + refresh failed
      if (token.error) {
        throw new Error("Refresh token failed");
      }

      // Refresh token
      return refreshAccessToken(token);
    },

    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }): Promise<CustomSession> {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.roles = token.roles || [];
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
