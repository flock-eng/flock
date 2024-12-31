import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCustomServerSession } from "@/lib/auth";
import { getColorFromUsername } from "@/lib/utils";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  // Await all async operations first
  const [session, id] = await Promise.all([
    getCustomServerSession(),
    params.id
  ]);

  // Now we can safely use the values
  const isCurrentUser = id === session?.user?.user_id;
  
  return (
    <div className="flex-1 flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarFallback 
                style={{ backgroundColor: getColorFromUsername(session?.user?.username || 'user') }}
                className="text-3xl text-white"
              >
                {session?.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold">
              {session?.user?.name}
            </h2>
            <p className="text-muted-foreground">
              @{session?.user?.username}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Posts</h3>
            <Card className="p-4 text-center text-muted-foreground">
              No posts yet
            </Card>
          </div>
        </Card>
      </main>
    </div>
  );
}
