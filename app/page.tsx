import { redirect } from "next/navigation";

export default async function Home() {
  redirect("http://localhost:3000/men");
}
