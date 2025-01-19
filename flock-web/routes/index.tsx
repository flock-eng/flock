import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
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
          You are authenticated via Keycloak. This is your secure dashboard.
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
