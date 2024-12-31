import * as React from "react";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/post-client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function CreatePostButton({ authorId }: { authorId: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const handleSubmit = async () => {
    if (content.trim()) {
      await createPost(authorId, content);
      setIsOpen(false);
      setContent("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="mb-4"
        />
        <Button onClick={handleSubmit} disabled={!content.trim()}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}