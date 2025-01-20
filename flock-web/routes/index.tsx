import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import Header from "../components/Header.tsx";
import LeftSidebar from "../components/LeftSidebar.tsx";
import RightSidebar from "../components/RightSidebar.tsx";
import MainFeed from "../components/MainFeed.tsx";

interface Data {
  username: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const token = cookies.kc_access_token;
    
    if (!token) {
      return ctx.render({ username: "Unknown User" });
    }

    const [_header, payload, _signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const username = decodedPayload.preferred_username || decodedPayload.sub || "Unknown User";
    
    return ctx.render({ username });
  }
};

export default function Home({ data }: PageProps<Data>): JSX.Element {
  return (
    <>
      <Head>
        <title>Flock - Home</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        <Header />
        <div class="pt-16 flex">
          <LeftSidebar />
          <main class="flex-1 ml-64 mr-64 min-h-screen p-4 animate-fade-in">
            <MainFeed />
          </main>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
