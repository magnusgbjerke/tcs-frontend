import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women | TCS",
  description: "Generated by create next app",
};

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>[Breadcrumbs/Nav]</header>
      {children}
    </div>
  );
}