import * as React from "react";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import {ApiClient} from "@/lib/api-client";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";

export function CreatePostButton({authorId}: { authorId: string }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [content, setContent] = React.useState("");

    const handleSubmit = async () => {
        if (content.trim()) {
            try {
                console.log("Creating post...");
                await ApiClient.posts.create(authorId, content);
                console.log("Post created!");
                setIsOpen(false);
                setContent("");
                toast.success("Post created successfully!");
            } catch (error) {
                console.error("Failed to create post:", error);
                toast.error("Failed to create post");
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full">New Post</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Post</DialogTitle>
                </DialogHeader>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className={cn(
                        "flex h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "mb-4"
                    )}
                />
                <Button onClick={handleSubmit} disabled={!content.trim()}>
                    Submit
                </Button>
            </DialogContent>
        </Dialog>
    );
}
