import { createPromiseClient } from "@bufbuild/connect";
import { createConnectTransport } from "@bufbuild/connect-web";
import { PostService } from "@buf/wcygan_flock.connectrpc_es/backend/v1/post_connect";
import { HomePageService } from "@buf/wcygan_flock.connectrpc_es/frontend/v1/home_page_connect";
import { ProfilePageService } from "@buf/wcygan_flock.connectrpc_es/frontend/v1/profile_page_connect";

const API_URL = "api." + process.env.FLOCK_API_URL;

if (!API_URL) {
  throw new Error("FLOCK_API_URL environment variable is not defined");
}

const transport = createConnectTransport({
  baseUrl: API_URL,
});

export const ApiClient = {
  posts: createPromiseClient(PostService, transport),
  homePage: createPromiseClient(HomePageService, transport),
  profilePage: createPromiseClient(ProfilePageService, transport),
};
