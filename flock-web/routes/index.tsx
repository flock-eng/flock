import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

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

    // Decode the JWT token (it's base64 encoded)
    const [_header, payload, _signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    
    // Get the preferred_username or fallback to sub claim
    const username = decodedPayload.preferred_username || decodedPayload.sub || "Unknown User";
    
    return ctx.render({ username });
  }
};

export default function Home({ data }: PageProps<Data>) {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Flock</h1>
        <p class="my-4">
          Welcome, {data.username}! You are authenticated via Keycloak. This is your secure dashboard.
        </p>
        <Counter count={count} />
        <div class="mt-6">
          <a
            href="/logout"
            class="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
