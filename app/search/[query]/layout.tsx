import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Search | TCS`,
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
