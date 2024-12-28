import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import {PostService} from "@buf/wcygan_flock.connectrpc_es/backend/v1/post_connect";

/**
 * Creates a ConnectRPC client for the PostService.
 */
function createClient() {
    const transport = createConnectTransport({
        baseUrl: process.env.NEXT_PUBLIC_FLOCK_API_URL ?? "https://api", // Adjust to your API endpoint
    });

    return createPromiseClient(PostService, transport);
}

/**
 * Calls the CreatePost method on the backend.
 */
export async function createPost(authorId: bigint, content: string) {
    const client = createClient();
    const res = await client.createPost({
        authorId,
        content,
    });
    return res.post;
}