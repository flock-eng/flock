import { JSX } from "preact";
import Header from "./Header.tsx";
import LeftSidebar from "./LeftSidebar.tsx";
import RightSidebar from "./RightSidebar.tsx";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div class="pt-16 flex">
        <LeftSidebar />
        <main class="flex-1 ml-64 mr-64 min-h-screen p-4">
          {children}
        </main>
        <RightSidebar />
      </div>
    </>
  );
} 