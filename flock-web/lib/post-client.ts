import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import {PostService} from "@buf/wcygan_flock.connectrpc_es/backend/v1/post_connect";

const API_URL = "api." + process.env.FLOCK_API_URL;

/**
 * Creates a ConnectRPC client for the PostService.
 */
function createClient() {
    const transport = createConnectTransport({
        baseUrl: API_URL!,
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