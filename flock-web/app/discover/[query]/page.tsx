// app/discover/[query]/page.tsx

import { Card } from "@/components/ui/card";

// 1. Define a type for your route params *as a Promise*:
type Params = Promise<{ query: string }>;

export async function generateMetadata({
                                           params,
                                       }: {
    params: Params;
}) {
    // 2. Await the params to access your route parameters:
    const { query } = await params;
    // For example, you might build dynamic meta info based on "query"
    return {
        title: `Discover - ${decodeURIComponent(query)}`,
    };
}

// 3. Use the same "Params" type for your page component:
export default async function DiscoverPage({
                                               params,
                                           }: {
    params: Params;
}) {
    const { query } = await params;
    const decodedQuery = decodeURIComponent(query);

    return (
        <div className="flex gap-4 p-4">
            <main className="flex-1 max-w-2xl mx-auto">
                <Card className="p-4 mb-4">
                    <h1 className="text-xl font-semibold">
                        Showing all results for &quot;{decodedQuery}&quot;
                    </h1>
                </Card>
                {/* Add your search results here */}
            </main>
        </div>
    );
}
