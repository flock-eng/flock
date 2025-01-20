import { JSX } from "preact";

export default function UnderConstruction(): JSX.Element {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        🚧 Under Construction 🚧
      </h1>
      <p class="text-gray-600">
        This page is currently under construction. Check back soon!
      </p>
    </div>
  );
} 