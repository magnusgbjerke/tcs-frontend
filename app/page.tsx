import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <p>This is the Home page {session?.user?.name}</p>
    </>
  );
}
