import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Image as ImageIcon } from "lucide-react"

export function Feed() {
  return (
    <div className="space-y-4">
      {/* Create Post Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <textarea
              className="w-full resize-none border-0 bg-transparent p-0 placeholder:text-muted-foreground focus:ring-0"
              placeholder="Share an update..."
              rows={2}
            />
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <ImageIcon className="h-4 w-4" />
              <span>Photo</span>
            </Button>
            <Button>Post</Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Post #1 */}
      <Card>
        <CardHeader className="flex items-center p-4">
          <div className="h-10 w-10 rounded-full bg-muted mr-3" />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Software Engineer at Tech Corp • 2h ago</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Large image preview */}
          <img
            src="https://via.placeholder.com/600x300?text=Sample+Bridge"
            alt="Post Preview"
            className="w-full object-cover h-64"
          />
          <div className="p-4">
            Just wrapped up an exciting project using the latest web technologies! 
            Looking forward to sharing more insights about the development process.
            #WebDev #Innovation
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between">
          <Button variant="ghost" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>

      {/* Example Post #2 */}
      <Card>
        <CardHeader className="flex items-center p-4">
          <div className="h-10 w-10 rounded-full bg-muted mr-3" />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">2h ago</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <img
            src="https://via.placeholder.com/600x300?text=Sample+Desk+Setup"
            alt="Post Preview"
            className="w-full object-cover h-64"
          />
          <div className="p-4">
            Here's a look at my workspace setup. 
            The combination of modern frameworks and best practices made this new project a breeze.
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between">
          <Button variant="ghost" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>

      {/* Example Post #3 */}
      <Card>
        <CardHeader className="flex items-center p-4">
          <div className="h-10 w-10 rounded-full bg-muted mr-3" />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">2h ago</p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <img
            src="https://via.placeholder.com/600x300?text=Sample+Waterfall"
            alt="Post Preview"
            className="w-full object-cover h-64"
          />
          <div className="p-4">
            Nature break! Sharing a moment of calm and reflection after an intense dev sprint.
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between">
          <Button variant="ghost" size="sm">
            <Heart className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
