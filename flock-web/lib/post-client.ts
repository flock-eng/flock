import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import {PostService} from "@buf/wcygan_flock.connectrpc_es/backend/v1/post_connect";
import { PostKey } from "@buf/wcygan_flock.bufbuild_es/backend/v1/post_pb";

const API_URL = "api." + process.env.FLOCK_API_URL;
if (!API_URL) {
  throw new Error("FLOCK_API_URL environment variable is not defined");
}

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
export async function createPost(authorId: string, content: string) {
    const client = createClient();
    const key = new PostKey({ id: authorId });

    const res = await client.createPost({
        author: key,
        content,
    });
    return res.post;
}
