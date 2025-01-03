import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCustomServerSession } from "@/lib/auth";
import { getColorFromUsername } from "@/lib/utils";

type ProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await getCustomServerSession();

  // Access params.id directly (it's synchronous)
  const { id } = await params;
  
  const isCurrentUser = id === session?.user?.user_id;
  
  return (
    <div className="flex gap-4 p-4">
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
            {isCurrentUser && (
              <div className="text-center text-green-600 font-medium mt-2">
                Welcome to your profile!
              </div>
            )}
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
