import { KeycloakJwtPayload } from "@/lib/utils";
import { CustomSession, CustomToken } from "@/next-auth";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions, User, Account } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

async function refreshAccessToken(token: CustomToken): Promise<CustomToken> {
  if (!token.refreshToken) {
    console.error("No refresh token available");
    return { ...token, error: "RefreshAccessTokenError" };
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
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
      error: undefined, // Clear any previous errors
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
    maxAge: 15 * 60, // 15 minutes
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

      // Initial sign-in
      if (account && user) {
        if (!account.expires_at || !account.access_token) {
          console.error("Missing token data in account", account);
          throw new Error("Invalid account data");
        }

        const decoded = jwtDecode<KeycloakJwtPayload>(account.access_token);
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000, // Convert to milliseconds
          refreshToken: account.refresh_token,
          user,
          roles: decoded.resource_access?.["tcs-client"]?.roles || [],
        };
      }

      // Return valid token if not expired
      if (token.accessTokenExpires && now < token.accessTokenExpires) {
        return token;
      }

      // Attempt token refresh
      return refreshAccessToken(token);
    },

    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomToken;
    }): Promise<CustomSession> {
      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
        roles: token.roles || [],
        error: token.error,
      };
    },
  },
};
