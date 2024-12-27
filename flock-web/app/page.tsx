import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HomePage } from "@/components/home-page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <HomePage session={session} />;
}

