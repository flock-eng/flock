import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import LeftSidebar from "../components/LeftSidebar.tsx";
import RightSidebar from "../components/RightSidebar.tsx";

export default function Messages(): JSX.Element {
  return (
    <>
      <Head>
        <title>Flock - Messages</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        <Header />
        <div class="pt-16 flex">
          <LeftSidebar />
          <main class="flex-1 ml-64 mr-64 min-h-screen p-4 animate-fade-in">
            <div class="flex items-center justify-center h-full">
              <div class="text-center">
                <div class="text-6xl mb-4">🚧</div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">Under Construction</h1>
                <p class="text-gray-600">We're working hard to bring you an amazing messaging experience!</p>
              </div>
            </div>
          </main>
          <RightSidebar />
        </div>
      </div>
    </>
  );
} 