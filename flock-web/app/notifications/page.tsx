import { Card } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <div className="flex-1 flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Under Construction</h2>
          <p className="text-muted-foreground">
            The notifications page is currently being worked on. Please check back later!
          </p>
        </Card>
      </main>
    </div>
  );
}
