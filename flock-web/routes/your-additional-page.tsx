import Header from "../components/Header.tsx";
import LeftSidebar from "../components/LeftSidebar.tsx";
import RightSidebar from "../components/RightSidebar.tsx";
import UnderConstruction from "../components/UnderConstruction.tsx";

export default function YourAdditionalPage() {
  return (
    <>
      <Header />
      <div class="pt-16 flex">
        <LeftSidebar />
        <main class="flex-1 ml-64 mr-64 min-h-screen p-4">
          <UnderConstruction />
        </main>
        <RightSidebar />
      </div>
    </>
  );
} 