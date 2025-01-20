import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RightSidebar() {
  return (
    <div className="space-y-4 py-4">
      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Example trending topics */}
          <div className="text-sm space-y-1">
            <p className="font-medium">#Technology</p>
            <p className="text-muted-foreground">1.2k posts today</p>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">#Programming</p>
            <p className="text-muted-foreground">856 posts today</p>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">#Innovation</p>
            <p className="text-muted-foreground">642 posts today</p>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suggested Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {/* Example “people” suggestions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <p>Jane Smith</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <p>Mike Johnson</p>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
