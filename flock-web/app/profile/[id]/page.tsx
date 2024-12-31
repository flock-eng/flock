import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCustomServerSession } from "@/lib/auth";

function hashUsername(username: string): string {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (hash & 0x00FFFFFF).toString(16).toUpperCase().padStart(6, '0');
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getCustomServerSession();
  const isCurrentUser = params.id === session?.user?.user_id;
  const profileColor = hashUsername(session?.user?.username || 'user');
  
  return (
    <div className="flex-1 flex gap-4 p-4">
      <main className="flex-1 max-w-2xl mx-auto">
        <Card className="p-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            <Avatar className="h-24 w-24" style={{ backgroundColor: `#${profileColor}` }}>
              <AvatarFallback className="text-3xl">
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
