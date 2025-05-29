import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    roles?: string[];
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

interface CustomSession extends Session {
  accessToken?: string;
  roles?: string[];
  error?: string;
}

interface CustomToken extends JWT {
  accessToken?: string;
  accessTokenExpires?: number;
  error?: string;
  roles?: string[];
  user?: User;
}

interface JWT {
  accessToken?: string;
  accessTokenExpires?: number;
  refreshToken?: string;
  roles?: string[];
  user?: User;
}
