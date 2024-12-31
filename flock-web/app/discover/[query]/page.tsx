import { Card } from "@/components/ui/card";

export default function DiscoverPage({
  params,
}: {
  params: { query: string };
}) {
  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <Card className="p-4 mb-4">
          <h1 className="text-xl font-semibold">
            Showing all results for "{decodedQuery}"
          </h1>
        </Card>
        {/* Add your search results here */}
      </main>
    </div>
  );
}
