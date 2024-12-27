import { getServerSession } from "next-auth";
import { HomePage } from "@/components/home-page";

export default async function Home() {
  const session = await getServerSession();

  return <HomePage session={session} />;
}

