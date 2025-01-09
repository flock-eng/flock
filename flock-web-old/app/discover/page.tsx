import { Card } from "@/components/ui/card";

export default function DiscoverLandingPage() {
  return (
    <div className="flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <Card className="p-4">
          <h1 className="text-xl font-semibold mb-4">Discover</h1>
          <p className="text-muted-foreground">
            Start exploring by typing in the search bar above.
          </p>
        </Card>
      </main>
    </div>
  );
}
